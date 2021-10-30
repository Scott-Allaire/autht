import { schedule } from "node-cron";

const startJobs = () => {
  schedule("* * * * *", () => {
    console.log("running a task every minute", new Date());
  });
};

export default startJobs;