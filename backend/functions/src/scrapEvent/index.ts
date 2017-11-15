import { Inject, scrapEvents } from "./scrapEvent"
import fetch from "node-fetch"
const inject: Inject = {
  fetchHtml: async (id: string) =>
    fetch("http://kvaskjer.hallingdal.no/event/?p=" + id).then(data =>
      data.text()
    ),
}

export default scrapEvents(inject)
