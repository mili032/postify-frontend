import { JSX } from "react";
import { PageProfile } from "./_components";

type Params = {
  params: Promise<{
    pageId: string;
  }>;
};

const Index = async ({ params }: Params): Promise<JSX.Element> => {
  const { pageId } = await params;
  return (
    <div>
      <PageProfile page_id={parseInt(pageId)} />
    </div>
  );
};

export default Index;
