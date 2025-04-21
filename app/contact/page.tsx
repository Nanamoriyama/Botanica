export default function contact() {
  return (
    <div className="mt-20 flex px-4 justify-center items-center flex-col">
      <div className="">
        <div className="font-extralight text-4xl m-10">Contact</div>
      </div>
      <form className="flex justify-center flex-col items-center w-full max-w-3xl gap-4 m-4">
        <input
          type="Name"
          placeholder="Name"
          className=" w-full border border-gray-800 px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-800 px-4 py-2"
          required
        />
        <input
          type="phone"
          placeholder="Phone number"
          className="w-full border border-gray-800 px-4 py-2"
          required
        />
        <textarea
          placeholder="Comment"
          rows={6}
          className="w-full border border-gray-800 px-4 py-2"
          required
        />
        <button className="bg-black text-slate-100 p-3">Send</button>
      </form>
    </div>
  );
}
