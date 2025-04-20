import { NextRequest } from 'next/server';
import { Octokit } from '@octokit/core';

/* const GITHUB_PERSONAL_ACCESS_TOKEN = process.env.GITHUB_PERSONAL_ACCESS_TOKEN; */
const GITHUB_FINE_GRAINED_ACCESS_TOKEN = process.env.GITHUB_FINE_GRAINED_ACCESS_TOKEN;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return new Response(JSON.stringify({ error: 'Missing owner or repo' }), {
      status: 400,
    });
  }

  if (!GITHUB_FINE_GRAINED_ACCESS_TOKEN) {
    return new Response(JSON.stringify({ error: 'GitHub token is not configured' }), {
      status: 500,
    });
  }

  const octokit = new Octokit({ auth: GITHUB_FINE_GRAINED_ACCESS_TOKEN });

  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/stats/code_frequency', {
      owner,
      repo,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    const status = error.status || 500;
    const message = error.message || 'Unknown error occurred';

    if (status === 401) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized: Please check your token permissions.' }),
        { status: 401 }
      );
    }

    if (status === 403) {
      return new Response(
        JSON.stringify({
          error: 'Forbidden: Token does not have access to the private repository.',
        }),
        { status: 403 }
      );
    }

    return new Response(JSON.stringify({ error: message }), {
      status,
    });
  }
}
