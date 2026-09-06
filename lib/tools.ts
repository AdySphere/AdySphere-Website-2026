import Anthropic from "@anthropic-ai/sdk";

export const TOOL_DEFINITIONS: Anthropic.Tool[] = [
  {
    name: "search_arxiv",
    description:
      "Search arXiv for recent papers matching a query. Use this to ground a pitch or claim in current research — e.g. 'starshade occulter design', 'pulsar timing array', 'in-space propellant depot'.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Search terms, e.g. 'laser communication satellite constellation'." },
        max_results: { type: "integer", description: "How many results to return (default 5, max 10).", minimum: 1, maximum: 10 },
      },
      required: ["query"],
    },
  },
  {
    name: "get_upcoming_launches",
    description:
      "Get the current upcoming orbital launch schedule (mission name, provider, pad, launch window, status). Use this to ground pitches in real launch cadence, or to check whether a proposed idea overlaps with something already manifested.",
    input_schema: {
      type: "object",
      properties: {
        limit: { type: "integer", description: "How many upcoming launches to return (default 5, max 15).", minimum: 1, maximum: 15 },
        search: { type: "string", description: "Optional keyword to filter by mission/provider name, e.g. 'Starlink' or 'Rocket Lab'." },
      },
    },
  },
  {
    name: "get_near_earth_objects",
    description:
      "Get near-Earth objects (asteroids) with close-approach data for the next few days from NASA's NeoWs feed — size estimates, velocity, miss distance, hazard flag. Use this to ground pitches about asteroid mining, planetary defense, or in-space resource utilization in real current objects.",
    input_schema: {
      type: "object",
      properties: {
        days: { type: "integer", description: "How many days ahead to look, starting today (default 3, max 7).", minimum: 1, maximum: 7 },
      },
    },
  },
];

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n) + "…" : s;
}

async function searchArxiv(args: { query: string; max_results?: number }) {
  const maxResults = Math.min(args.max_results ?? 5, 10);
  const url = `http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(
    args.query
  )}&start=0&max_results=${maxResults}&sortBy=submittedDate&sortOrder=descending`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`arXiv API returned ${res.status}`);
  const xml = await res.text();

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  const results = entries.map((entry) => {
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/\s+/g, " ").trim();
    const summary = entry.match(/<summary>([\s\S]*?)<\/summary>/)?.[1]?.replace(/\s+/g, " ").trim();
    const id = entry.match(/<id>([\s\S]*?)<\/id>/)?.[1]?.trim();
    const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim();
    const authors = [...entry.matchAll(/<name>([\s\S]*?)<\/name>/g)].map((a) => a[1].trim());
    return {
      title,
      authors,
      published,
      summary: summary ? truncate(summary, 500) : undefined,
      link: id,
    };
  });

  return { query: args.query, count: results.length, results };
}

async function getUpcomingLaunches(args: { limit?: number; search?: string }) {
  const limit = Math.min(args.limit ?? 5, 15);
  const url = `https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=${limit}&mode=detailed${
    args.search ? `&search=${encodeURIComponent(args.search)}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Launch Library API returned ${res.status}`);
  const data = await res.json();

  const results = (data.results ?? []).map((launch: any) => ({
    name: launch.name,
    net: launch.net,
    status: launch.status?.name,
    provider: launch.launch_service_provider?.name,
    rocket: launch.rocket?.configuration?.name,
    pad: launch.pad?.name,
    location: launch.pad?.location?.name,
    mission: launch.mission?.description ? truncate(launch.mission.description, 300) : undefined,
    orbit: launch.mission?.orbit?.name,
  }));

  return { count: results.length, results };
}

async function getNearEarthObjects(args: { days?: number }) {
  const days = Math.min(args.days ?? 3, 7);
  const start = new Date();
  const end = new Date(start);
  end.setDate(end.getDate() + days);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${fmt(start)}&end_date=${fmt(
    end
  )}&api_key=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`NASA NeoWs API returned ${res.status}`);
  const data = await res.json();

  const results: any[] = [];
  for (const date of Object.keys(data.near_earth_objects ?? {})) {
    for (const neo of data.near_earth_objects[date]) {
      const approach = neo.close_approach_data?.[0];
      results.push({
        name: neo.name,
        date,
        estimated_diameter_km: neo.estimated_diameter?.kilometers,
        is_potentially_hazardous: neo.is_potentially_hazardous_asteroid,
        miss_distance_km: approach?.miss_distance?.kilometers,
        relative_velocity_kph: approach?.relative_velocity?.kilometers_per_hour,
        jpl_url: neo.nasa_jpl_url,
      });
    }
  }

  return { window: `${fmt(start)} to ${fmt(end)}`, count: results.length, results };
}

export async function executeTool(name: string, input: any): Promise<unknown> {
  switch (name) {
    case "search_arxiv":
      return searchArxiv(input);
    case "get_upcoming_launches":
      return getUpcomingLaunches(input);
    case "get_near_earth_objects":
      return getNearEarthObjects(input);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
