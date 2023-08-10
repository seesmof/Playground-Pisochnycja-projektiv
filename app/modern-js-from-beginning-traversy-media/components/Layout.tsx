import Link from "next/link";
import { BsArrowLeftCircle } from "react-icons/bs";

interface LayoutProps {
  pageName: string;
  children: React.ReactNode;
}

const Layout = ({ pageName, children }: LayoutProps) => {
  return (
    <>
      <section className="bg-slate-900 text-slate-50 min-h-screen">
        <div className="layout">
          <div className="py-4 flex flex-row gap-2 items-center">
            <Link href="/modern-js-from-beginning-traversy-media">
              <BsArrowLeftCircle className="stroke-1" />
            </Link>
            <h1 className="font-medium text-xl capitalize">{pageName}</h1>
          </div>
          {children}
        </div>
      </section>
    </>
  );
};

export default Layout;
