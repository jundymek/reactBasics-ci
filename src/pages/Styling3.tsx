import avatar from "../assets/images/avatar.jpg"
import bumble from "../assets/images/bumble.png"
import screenshot from "../assets/images/screenshot.png"
import { LazyLoadImage } from "react-lazy-load-image-component"

export const Styling3 = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-center font-bold text-xl mb-4">Image Gallery</h2>
      <div className="flex justify-center items-center gap-10 bg-red-500 h-screen" />
      <LazyLoadImage
        src={avatar}
        srcSet={`${avatar} 1x, ${bumble} 2x`}
        sizes="(max-width: 768px) 20%, (max-width: 1200px) 50%, 25%"
        alt="Avatar"
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC')`,
        }}
      />
      <LazyLoadImage
        src={bumble}
        srcSet={`${bumble} 1x, ${bumble} 2x`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Bumble"
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={screenshot}
        srcSet={`${screenshot} 1x, ${screenshot} 2x`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        threshold={1}
        onLoad={() => console.log("Image 1loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={"https://picsum.photos/id/1/200/300"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        threshold={1}
        onLoad={() => console.log("Image 2loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={"https://picsum.photos/id/2/200/300"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        onLoad={() => console.log("Image 3loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={"https://picsum.photos/id/3/200/300"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        threshold={1}
        onLoad={() => console.log("Image 4loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={"https://picsum.photos/id/4/200/300"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        threshold={1}
        onLoad={() => console.log("Image 5loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
      <LazyLoadImage
        src={"https://picsum.photos/id/5/200/300"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        alt="Screenshot"
        loading="lazy"
        threshold={1}
        onLoad={() => console.log("Image 6loaded")}
        className="transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
      />
    </div>
  )
}
