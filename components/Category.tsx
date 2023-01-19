"use client";
import Link from "next/link";
import { useState } from "react";
import type { Category as ICategory } from "../type";
import {useSelectedLayoutSegments } from 'next/navigation';

type Props = {
  category: ICategory;
};

function Category({ category: { id, name, sublevels } }: Props) {


  const [, , order] = useSelectedLayoutSegments()
  const [isToggled, toggle] = useState<boolean>(false);
  
  return (
    <div className="ml-4">
      <Link href={`/${id}/0/${order}`}>{name}</Link>
     {sublevels?.length! > 0  && (
       <span className="cursor-pointer" onClick={() => toggle((isToggled) => !isToggled)}>[{isToggled ? "cerrar" : "abrir"}]</span>
     )}
      {isToggled &&
        sublevels?.map((sublevel) => (
          <Category key={sublevel.id} category={sublevel} />
        ))}
    </div>
  );
}

export default Category;
