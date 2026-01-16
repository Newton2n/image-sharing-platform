import BackButton from "@/components/ui/back-button";
import BackHome from "@/components/ui/back-home";
// Animation
const style = `
  :root { --car-radius: 90px; }

  @media (max-width: 640px) {
    :root { --car-radius: 55px; }
  }

  @media (min-width: 1024px) {
    :root { --car-radius: 120px; }
  }

  @keyframes driveA {
    0% { transform: rotate(0deg) translateX(var(--car-radius)) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(var(--car-radius)) rotate(-360deg); }
  }

  @keyframes driveB {
    0% { transform: rotate(180deg) translateX(var(--car-radius)) rotate(-180deg); }
    100% { transform: rotate(540deg) translateX(var(--car-radius)) rotate(-540deg); }
  }

  .tilt { transform: rotate(-3deg); }
`;

const AnimatedCar = ({ animationName, color, rotation }) => (
  <div
    className={`absolute top-1/2 left-1/2 -ml-1.5 -mt-1 w-3 h-2 rounded-full shadow-md ${color}`}
    style={{
      animation: `${animationName} 5.5s linear infinite`,
      transformOrigin: "0 0",
      transform: rotation,
    }}
  >
    <div className="absolute top-0 right-0 w-1 h-1 bg-yellow-300 rounded-full"></div>
  </div>
);

const NotFoundPage = () => {
  return (
    <>
      <style>{style}</style>

      <div className="h-screen w-full bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center font-['Inter'] px-4">
        {/* 404 */}
        <div
          className="flex items-center justify-center select-none"
          style={{ lineHeight: 1 }}
        >
          <span
            className="font-extrabold text-gray-800 dark:text-gray-200 tilt"
            style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
          >
            4
          </span>

          {/* Circular Road */}
          <div
            className="relative mx-4"
            style={{
              width: "clamp(120px, 28vw, 260px)",
              height: "clamp(120px, 28vw, 260px)",
            }}
          >
            <div className="absolute inset-0 rounded-full border-12 border-gray-300 dark:border-gray-600 border-dashed"></div>

            <div
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "inset 0 0 0 5px rgba(75,85,99,1)",
              }}
            >
              <AnimatedCar
                animationName="driveA"
                color="bg-green-500"
                rotation="rotate(0deg)"
              />
              <AnimatedCar
                animationName="driveB"
                color="bg-blue-500"
                rotation="rotate(180deg)"
              />
            </div>
          </div>

          <span
            className="font-extrabold text-gray-800 dark:text-gray-200 tilt"
            style={{ fontSize: "clamp(4rem, 12vw, 12rem)" }}
          >
            4
          </span>
        </div>

        {/* Text */}
        <h2
          className="mt-6 text-gray-900 dark:text-gray-100 font-semibold text-nowrap"
          style={{ fontSize: "clamp(1rem, 4vw, 2.5rem)" }}
        >
          OOPS! SORRY⚠️PAGE NOT FOUND
        </h2>

        <div className="flex gap-x-3 md:gap-x-6 mt-4">
          <BackHome />
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
