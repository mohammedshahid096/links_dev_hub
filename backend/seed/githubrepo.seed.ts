import {
  fetchGithubRepoData,
  parseGithubUrl,
} from "./../src/helpers/github.helper";
import { prisma } from "../src/configs/prismaClient";
import { GithubRepo, User } from "../generated/prisma/client";

const githubReposList = [
  {
    title: "MERN Stack - Comprehensive MERN Starter",
    url: "https://github.com/hashirshoaeb/mern-stack",
  },
  {
    title: "React Styleguideist - Living style guide & documentation",
    url: "https://github.com/styleguidist/react-styleguidist",
  },
  {
    title: "System Design Primer - Learn how to design large-scale systems",
    url: "https://github.com/donnemartin/system-design-primer",
  },
  {
    title:
      "Awesome React - A collection of awesome things regarding React ecosystem",
    url: "https://github.com/enaqx/awesome-react",
  },
  {
    title:
      "Node.js Best Practices - The most comprehensive list of best practices",
    url: "https://github.com/goldbergyoni/nodebestpractices",
  },
  {
    title:
      "Developer Roadmap - Roadmaps, articles and resources for developers",
    url: "https://github.com/kamranahmedse/developer-roadmap",
  },
  {
    title: "Modern JavaScript Cheatsheet - A guide for the modern era",
    url: "https://github.com/mbeaudru/modern-js-cheatsheet",
  },
  {
    title: "RealWorld - The mother of all demo apps (MERN implementations)",
    url: "https://github.com/gothinkster/realworld",
  },
  {
    title: "Bulletproof React - Architecture and best practices for React",
    url: "https://github.com/alan2207/bulletproof-react",
  },
  {
    title:
      "30 Seconds of Code - Short JavaScript code snippets for all your needs",
    url: "https://github.com/30-seconds/30-seconds-of-code",
  },
  {
    title: "Public APIs - A collective list of free APIs for use in software",
    url: "https://github.com/public-apis/public-apis",
  },
  {
    title: "Tech Interview Handbook - Curated prep material for interviews",
    url: "https://github.com/yangshun/tech-interview-handbook",
  },
  {
    title: "Front-End Checklist - The tool for modern front-end developers",
    url: "https://github.com/thedaviddias/Front-End-Checklist",
  },
  {
    title: "Clean Code JavaScript - Clean code concepts adapted for JavaScript",
    url: "https://github.com/ryanmcdermott/clean-code-javascript",
  },
  {
    title: "Awesome Shortcuts - Productivity shortcuts for dev tools",
    url: "https://github.com/alebcay/awesome-shell",
  },
];

class GithubRepoSeedingService {
  constructor() {}

  async fetchFirstAdminUser(): Promise<User> {
    console.log("-------- started fetching the first admin user role --------");
    const data = await prisma.user.findFirst({ where: { role: "admin" } });
    if (data) {
      console.log("admin user found, Id:", data.id, data.name);
    } else {
      console.log("admin user not found");
      console.log("process is exiting");
      process.exit(0);
    }
    return data;
  }

  async repoSeed(userId: string) {
    const processedData: GithubRepo[] = [];

    for (let index = 0; index < githubReposList.length; index++) {
      const element = githubReposList[index];
      const { url } = element;
      console.log(index, "processing for the ", url);

      try {
        // 1. Parse the GitHub URL
        const parsed = parseGithubUrl(url);
        if (!parsed) {
          console.log(
            "Invalid GitHub URL. Expected format: https://github.com/username/repo-name",
          );
          continue;
        }

        const { username, repoName } = parsed;
        let githubData: any;
        githubData = await fetchGithubRepoData(username, repoName);

        const existingRepo = await prisma.githubRepo.findUnique({
          where: { repoId: githubData.id },
        });

        if (existingRepo) {
          console.log("This GitHub repository has already been added.");
        }

        // 4. Map GitHub API response → our schema
        const data = {
          repoId: githubData.id, // Int  — GitHub's unique numeric ID
          username: githubData.owner?.login ?? username, // repo owner login
          repoName: githubData.name, // repo name (as GitHub stores it)
          url: githubData.html_url, // canonical HTML URL
          description: githubData.description ?? null,
          language: githubData.language ?? null,
          topics: githubData.topics ?? [], // string[]
          isActive: true,
          created_by: userId,
        };

        // 5. Persist
        const newRepoDetails = await prisma.githubRepo.create({ data });
        processedData.push(newRepoDetails);
      } catch (error) {
        console.log(error);
      }
    }

    console.log(
      "Github Seed Completed.",
      processedData.length,
      "Repo's inserted.",
    );
  }
}

async function startSeedingServer(): Promise<void> {
  const githubRepoSeedingService = new GithubRepoSeedingService();

  const userDetail = await githubRepoSeedingService.fetchFirstAdminUser();

  if (!userDetail) {
    console.log(" admin user not found");
    return;
  }

  await githubRepoSeedingService.repoSeed(userDetail.id);

  console.log("All seeding operations completed.");
  process.exit(0);
}

startSeedingServer();
