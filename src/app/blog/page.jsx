"use server"
import Footer from "@/components/footer/Footer"

export default async function blogPage() {
  return (
  <>
    <div className="relative flex flex-col w-full min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-81px)] top-[72px] md:top-[81px]"></div>
    <Footer />
  </>)
}
