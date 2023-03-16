import React from "react";

export const replaceString = (temp: string, searchValue: string) => {
  let str = ''

  if (searchValue && temp) {
    let regex = new RegExp(searchValue, "gi");
    str = temp.replace(regex, '<strong class="slug">$&</strong>');
  }
  return (
    <span dangerouslySetInnerHTML={{ __html: str }} />
  )
}