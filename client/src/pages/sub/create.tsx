import React, {FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/router";
import InputGroup from "../../components/InputGroup";
import axios from "axios";
import { useAuthState } from "../../context/auth";

export default function create() {
  let router = useRouter();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  // if (!authenticated) router.push("/");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/sub", { title, description });
      router.push(`/r/${res.data.title}`);
    } catch (error: any) {
      console.log(error);
      setErrors(error?.response?.data || {});
    }
  };

  return (
    <div className="flex flex-col justify-center pt-16">
      <div className="w-10/12 mx-auto md:w-96">
        <h1 className="mb-2 text-lg font-medium">커뮤니티 만들기</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="my-6">
            <p className="font-medium"> Title </p>
            <p className="mb-2 text-xs text-gray-400">
              커뮤니티 제목을 작성해주세요. 변경 할 수 없습니다.
            </p>
            <InputGroup
              value={title}
              error={errors.title}
              setValue={setTitle}
              placeholder="주제"
            />
          </div>
          <div className="my-6">
            <p className="font-medium"> Description </p>
            <p className="mb-2 text-xs text-gray-400">
              커뮤니티에 대한 설명입니다.
            </p>
            <InputGroup
              value={description}
              error={errors.description}
              setValue={setDescription}
              placeholder="설명"
            />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1 text-sm font-semi-bold rounded text-white bg-gray-400 border">
              커뮤니티 생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}