import EditorArea from "@/components/EditorArea";
import LeftSideBar from "@/components/LeftSideBar";
import RightBar from "@/components/RightBar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="grid grid-cols-10">
      <div className="col-span-2">
        <LeftSideBar />
      </div>
      <div className="col-span-6">
        <EditorArea />
      </div>
      <div className="col-span-2">
        <RightBar />
      </div>
    </main>
  );
}
