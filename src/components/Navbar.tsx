import { signal } from "@preact/signals-react";

import headerLinks from "../siteData/headerLinks";

import getCurrentPage from "../signals/getCurrentPage";

const currentPage = signal(getCurrentPage());
console.log("currentPage: %o", currentPage);
console.log("currentPage: %o", currentPage.value);

export default function Navbar() {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        DIDtools
      </a>
      <ul>
        {headerLinks.map((obj, index) => {
          return (
            <li
              key={obj.name}
              className={currentPage === obj.name ? "active" : "unactive"}
            >
              <a
                onClick={() => getCurrentPage.v}
                href={obj.href.concat((index + 1).toString())}
              >
                {obj.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
