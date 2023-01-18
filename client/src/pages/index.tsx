import Link from "next/link";
import axios from "axios";
import { Sub } from "../types/user";
import { useEffect, useState } from "react";

export default function Home() {
  const [topSubs, setTopSubs] = useState<[Sub]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/sub/topSubs");
        console.log(response.data);
        setTopSubs(response.data);

      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex max-w-5xl px-4 pt-5 mx-auto">
      {/*포스트 리스트*/}
      <div className="w-full md:mr-3 md:w-8/12 "></div>
      {/*사이드바*/}
      <div className="hidden w-4/12 ml-3 md:block">
        <div className="bg-white border rounded">
          <div className="p-4 border-b">
            <p className="text-lg font-semibold text-center">상위 커뮤니티</p>
          </div>
          {/*커뮤니티 리스트*/}
          <div>
            {topSubs?.map((sub) => (
              <div
                key={sub.title}
                className="flex items-center px-4 py-2 text-xs border-b"
              >
                <Link href={`/r/${sub.title}`}> `/r/{sub.title}`</Link>
                <p className="ml-auto font-md">{sub._count.post}</p>
              </div>
            ))}
          </div>
          <div className="w-full py-6 text-center">
            <Link
              href="subs/create"
              className="w-full p-2 text-center text-white bg-gray-400 rounded"
            >
              커뮤니티 만들기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
