import * as chai from "chai";
import { outputAgency } from "../../../src/gtfs/output/agency";

describe("outputAgency", () => {

  it("gets agencies from a partial GTFS", () => {
    const actual = outputAgency();
    const expected = "agency_id,agency_name,agency_url,agency_timezone,agency_lang,agency_phone,agency_fare_url\n"
      + "eurostar,Eurostar,http://eurostar.com,Europe/Paris,fr,,";

    chai.expect(actual).to.equal(expected);
  });

});
