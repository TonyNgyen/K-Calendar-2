import Link from "next/link";
import React from "react";

function outdated() {
  return (
    <div className="h-96">
      <article className="p-10 m-56 bg-slate-700 text-xl leading-8 text-white">
        K-Calendar was the first project I ever developed. As a result, I made a
        lot mistakes developing the web application that forced me to think of
        crude solutions in order to make the application function in the first
        place without considering how those solutions would be maintianed in the
        future. As a result, it has become extremely hard to maintain and
        further develop features. I have shifted my focus to another project,{" "}
        <Link href={"https://github.com/TonyNgyen/GymTracker"}>GymTracker</Link>{" "}
        which has taught me many lessons that I can use in my future projects to
        streamline development. Because of this, I will return to K-Calendar in
        the future and develop a new version that is vastly superior to what you
        currently see with new features and ease-of-access for me to continously
        update/maintain it.
        <div className="text-right">- Tony</div>
      </article>
    </div>
  );
}

export default outdated;
