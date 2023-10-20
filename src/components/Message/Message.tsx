export function Message() {
  return (
    <section className="flex items-start justify-start gap-4">
      <div className="text-stone-400 p-3 bg-stone-800 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-stone-600 text-md font-semibold">Jorge Reyes</h4>
        <p className="text-stone-200 text-md font-light leading-normal">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          aliquam, temporibus adipisci nulla magnam deleniti tenetur, numquam
          quasi molestiae doloremque libero similique excepturi debitis at, eius
          atque aut tempore vel. Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Odit sunt laudantium voluptatem alias. Inventore
          expedita architecto obcaecati deserunt odio in quaerat odit neque
          tempora incidunt modi debitis dolor, dicta illo? Lorem ipsum dolor
          sit, amet consectetur adipisicing elit. Suscipit nulla ea sapiente
          dolorum reiciendis odit dolorem quos non consequatur quod ab, aperiam
          maxime, possimus necessitatibus fugiat. Enim explicabo qui
          accusantium!
        </p>
      </div>
    </section>
  );
}
