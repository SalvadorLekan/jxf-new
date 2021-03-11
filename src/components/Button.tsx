function Button({ onClick }: { onClick: Function }) {
  return (
    <button
      onClick={() =>
        onClick((prev: string) => (prev === "left-0" ? "left-full" : "left-0"))
      }
      className="btn z-20 relative text-green-800 bg-green-200 ring-green-400"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-heart-fill"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
        asperiores!
      </p>
    </button>
  );
}

export default Button;
