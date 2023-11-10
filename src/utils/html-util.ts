import { RouterMap } from "../types/router";

export class HtmlUtil {
  static render(rootDiv: HTMLElement | null, router: RouterMap) {
    if (!rootDiv) {
      throw new Error("Missing root element!");
    }
    // On init
    rootDiv.innerHTML = router[window.location.pathname];

    // Listener for events
    HtmlUtil.allEventListeners(rootDiv, router);
  }

  static allEventListeners(rootDiv: HTMLElement, router: RouterMap) {
    // Capture elements
    const homeAnchor = document.getElementById("home");
    const aboutAnchor = document.getElementById("about");
    const contactAnchor = document.getElementById("contact");

    // Event listener attachment
    homeAnchor?.addEventListener("click", () =>
      HtmlUtil.onNavigate(rootDiv, router, "/")
    );

    aboutAnchor?.addEventListener("click", () =>
      HtmlUtil.onNavigate(rootDiv, router, "/about")
    );

    contactAnchor?.addEventListener("click", () =>
      HtmlUtil.onNavigate(rootDiv, router, "/contact")
    );
  }

  static onNavigate = (
    rootDiv: HTMLElement | null,
    router: RouterMap,
    pathname: string
  ) => {
    const { origin } = window.location;
    console.log(`${origin}${pathname}`);

    window.history.pushState({}, pathname, `${origin}${pathname}`);

    if (rootDiv) {
      rootDiv.innerHTML = router[pathname];
    }
  };
}
