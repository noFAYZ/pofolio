import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div className={cn("flex fixed bottom-0 left-0 right-0  justify-center  md:hidden py-2", className)}>
      <div className="flex justify-around items-center w-1/2 bg-gray-50 dark:bg-neutral-900 rounded-full ">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center"
          >
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
              <div className="h-5 w-5">{item.icon}</div>
            </div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-300">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};


const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseY = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseY.set(e.pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      className={cn(
        "fixed left-12 top-1/2 -translate-y-1/2 hidden md:flex flex-col w-16 gap-4 items-center rounded-full bg-muted border py-4 px-3",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseY={mouseY} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseY,
  title,
  icon,
  href,
}: {
  mouseY: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseY, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  let sizeTransform = useTransform(distance, [-150, 0, 100], [55, 60, 55]);
  let iconSizeTransform = useTransform(distance, [-150, 0, 150], [30, 40, 30]);

  let size = useSpring(sizeTransform, {
    mass: 0.01,
    stiffness: 100,
    damping: 2,
  });

  let iconSize = useSpring(iconSizeTransform, {
    mass: 0.01,
    stiffness: 100,
    damping: 2,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width: size, height: size }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-background flex items-center justify-center relative"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
     
              className="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-full ml-2 top-1/2 -translate-y-1/2 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: iconSize, height: iconSize }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}