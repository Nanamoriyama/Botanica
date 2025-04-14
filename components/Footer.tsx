import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between md:px-10 m-6">
        <div className="mb-4">
          <div className="md:mb-3 font-light">
            <label
              htmlFor="country"
              className="text-xs md:text-sm text-gray-600"
            >
              Country/Region
            </label>
          </div>
          <div className="w-52 border border-stone-900 p-3 font-light text-sm">
            <select id="country" className="outline-none">
              <option value="NL">Netherlands | EUR</option>
              <option value="JP">Japan | JPY</option>
              <option value="US">United States | USD</option>
            </select>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Image src="/logos/visa.svg" alt="VIS Logo" width={40} height={20} />
          <Image
            src="/logos/master.svg"
            alt="VIS Logo"
            width={40}
            height={20}
          />
          <Image src="/logos/amex.svg" alt="VIS Logo" width={40} height={20} />
          <Image
            src="/logos/paypal.svg"
            alt="VIS Logo"
            width={40}
            height={20}
          />
          <Image
            src="/logos/discover.svg"
            alt="VIS Logo"
            width={40}
            height={20}
          />
          <Image src="/logos/d.svg" alt="VIS Logo" width={40} height={20} />
        </div>
      </div>
      <div className="m-6 font-extralight text-xs text-gray-700 md:px-10">
        © 2025, nana-plant-store. privacy policy. Cookie preferences
      </div>
    </>
  );
}
