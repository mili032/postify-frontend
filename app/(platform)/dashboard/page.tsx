import { JSX } from "react";
import {
  Cards,
  RecentPosts,
  UpcomingPosts,
  EngagementStats,
} from "./_components";

const Index = (): JSX.Element => {
  return (
    <section className={`grid grid-cols-12 gap-5 mt-5`}>
      <div className={`col-span-12 xl:col-span-6 2xl:col-span-7 space-y-5`}>
        <Cards />
        <UpcomingPosts />
        <EngagementStats />
      </div>
      <div className={`col-span-12 xl:col-span-6 2xl:col-span-5 space-y-5`}>
        <RecentPosts />
      </div>
    </section>
  );
};

export default Index;
