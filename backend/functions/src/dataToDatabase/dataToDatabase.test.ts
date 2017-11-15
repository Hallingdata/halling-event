import { dataToDatabase, Inject } from "./dataToDatabase"
import { response } from "./dataToDatabase.test.data"
import * as R from "ramda"

const dummyEventDetails = {
  Beskrivelse:
    "Ål Kyrkjeakademi og Ål bibliotek presenterer:\nNils Ivar Agøy i samtale om lutherdom, demokrati og velferdsstat.\nNils Ivar Agøy (f. 1959) er professor i moderne historie ved Høgskolen i\nSørøst-Norge, og har i tillegg teologisk utdanning. Mest kjent er han kanskje\nfor si brennande interesse for J.R.R. Tolkien, og for å ha omsett fleire av\nverka hans til norsk.\nDet er 500 år sidan Martin Luther slo opp dei 95 tesene sine på døra til\nslottskyrkja i Wittenberg. Kva følgjer fekk reformasjonen for norsk politisk\nkultur frå 1800-talet og framover? Kva har reformasjonen hatt å seie for\ndemokratiseringa og utviklinga av velferdsstaten?\nNils Ivar Agøy gir oss spennande innsikt i dei samfunnsmessige\nlangtidsverknadene av den lutherske reformasjonen i Noreg.\nGRATIS INNGANG.\nStad: Ål bibliotek.",
  "Tid og sted": "Onsdag 15.11.2017 Kl. 19:15 Ål Bibliotek",
  Kontaktinfo:
    "Tlf: +47 32 08 51 00\nEmail:\nWeb: www.hallingbillett.no/arrangementinfo.aspx?id=736&ver=1&cid=2567\n[http://www.hallingbillett.no/arrangementinfo.aspx?id=736&ver=1&cid=2567]",
}

test("When date of last entry in DB is '0' all events should be retruned", async () => {
  const inject: Inject = {
    getData: () => Promise.resolve(JSON.parse(R.trim(response))),
    getEventDetails: () => Promise.resolve(dummyEventDetails),
    getDateOfLastEntryInDb: () => Promise.resolve(new Date(0)),
    writeToDatabase: (data: Array<any>) =>
      Promise.resolve({
        numberOfNewEvents: data.length,
      }),
  }

  const data = await dataToDatabase(inject)
  expect(data.numberOfNewEvents).toBe(10)
})

test("When date of last event is '2017-11-01T10:29:03' only three events should be returned", async () => {
  const inject: Inject = {
    getData: () => Promise.resolve(JSON.parse(R.trim(response))),
    getEventDetails: () => Promise.resolve(dummyEventDetails),
    getDateOfLastEntryInDb: () =>
      Promise.resolve(new Date("2017-11-01T10:29:03")),
    writeToDatabase: (data: Array<any>) =>
      Promise.resolve({
        numberOfNewEvents: data.length,
      }),
  }

  const data = await dataToDatabase(inject)
  expect(data.numberOfNewEvents).toBe(3)
})
