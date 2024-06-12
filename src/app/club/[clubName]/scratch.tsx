import { TriangleAlert } from "lucide-react";
import { Spinner } from "~/components/ui/spinner";

const errorRender = (
  <div className="grid h-[50dvh] place-items-center">
    <div className="flex items-center gap-2 text-secondary">
      <TriangleAlert />
      <h1>something went wrong...</h1>
    </div>
  </div>
);

const loader = (
  <div className="grid h-[50dvh] place-items-center">
    <Spinner />
  </div>
);
