import * as cheerio from "cheerio"
import * as htmlToText from "html-to-text"
import * as R from "ramda"

import { HallingEvent } from "../../../../types"

export type Inject = {
  fetchHtml: (id: string) => PromiseLike<string>
}

export const scrapEvents = ({ fetchHtml }: Inject) => (
  id: string
) =>
        fetchHtml(id)
          .then(cheerio.load)
          .then($ => {
            const ulListArray = $("ul.info-list")
              .children()
              .toArray()
            return R.reduce(
              (acc, liElement) => {
                const header = $(liElement)
                  .find("h2")
                  .text()
                const body = htmlToText
                  .fromString(
                    $(liElement)
                      .find("div")
                      .html()
                  )

                // ignore kart info but return the rest
                return header != "Kart" ? { ...acc, [header]: body } : acc
              },
              {},
              ulListArray
            )
            //         const array = $("ul.info-list").children().map((index, element) => element..find("h2").contents().text())
          })
