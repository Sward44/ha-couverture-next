"use client";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loading, Mark, Send, Star, StarUnDemi, User,} from "@/components/logo/Logo";
import Image from "next/image";

export default function FormAdd({ handleForm, session }) {
  const [note, setNote] = React.useState(5);
  const [decimalPart, setDecimalPart] = React.useState(0);
  const [initialNote, setInitialNote] = React.useState(5);
  const [hoverNote, setHoverNote] = React.useState(null);
  const isFinish = React.useRef(false);
  const router = useRouter();

  function handleValue(e) {
    e.preventDefault();
    setNote(Number(e.target.value));
    if (e.target.value.length > 1) {
      setDecimalPart(Number(e.target.value.toString().split('.')[1]));
    } else {
      setDecimalPart(0);
    } 
  }

  const schema = yup.object({
    notes: yup
      .string()
      .required("Note obligatoire")
      .min(0, "0 minimum")
      .max(5, "5 maximum"),
    title: yup
      .string()
      .required("Titre obligatoire")
      .min(5, "5 caractères minimum")
      .max(36, "36 caractère maximum"),
    comments: yup.string().required("Le sujet de votre email est demandé...").min(20, "20 cractères minimum"),
  });

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {notes: note},
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    try {
      clearErrors();
      const newEmail = { ...values, notes: note, email: session?.user?.email };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmail),
        }
      );
      if (response.ok) {
        const dataResponse = await response.json();
        reset();
        toast.success(dataResponse.message || "Votre avis est enregistré");
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || response.statusText);
      }
    } catch (e) {
      if (e) {
        toast.error(e.message || "Une erreur s'est produite");
      } else {
        toast.error("Une erreur inconnue s'est produite");
      }
    } finally {
      handleForm();
    }
  }

  function getStarType(index) {
    const currentNote = hoverNote ? Number(hoverNote) : Number(note)
    if (index < currentNote - 0.5) {
      return "full";
    } else if (currentNote > Number(index) && currentNote < Number(index + 1)) {
      return "half";
    } else {
      return "empty";
    }
  }

  function handleStarHover(event, index) {
    const { width, left } = event.currentTarget.getBoundingClientRect();
    const hoverPosition = event.clientX - left;
    let hoverValue;
    if (hoverPosition / width <= 0.5) {
      hoverValue = Number(index + 0.5);
    } else {
      hoverValue = Number(index + 1);
    }
    setHoverNote(hoverValue);
  }

  function handleStarClick() {
    setNote(hoverNote);
    setInitialNote(hoverNote);
  }

  function handleStarLeave() {
    setHoverNote(null);
  }

  return (
    <div className={`fixed flex justify-center items-center top-0 left-0 w-full h-screen z-30 py-8 px-4 sm:px-12 md:py-32 animate-[apparitionEcran_0.5s_ease_forwards]`}>
          <form onSubmit={handleSubmit(submit)} className="relative h-full w-full shadow-ha px-4 py-8 rounded-xl grid grid-cols-1 my-4 sm:grid-cols-[1fr_1fr]  grid-rows-[auto_auto_1fr_60px] sm:grid-rows-[auto_auto_auto_1fr_60px] sm:max-w-[640px] bg-neutral-100">
            <div className="absolute flex items-center top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10 bg-neutral-100 rounded-full border border-neutral-300 shadow-ha">
              <div className="size-8 ml-1 mr-2">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session?.user?.name}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center size-8 bg-neutral-300 rounded-full">
                    <div className="size-6 fill-neutral-950">
                      <User />
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs pr-4">{session?.user?.email}</p>
                <p className="text-xs pr-4 pb-1">{session?.user?.name}</p>
              </div>
            </div>
            <div className="hidden sm:flex justify-between sm:col-span-2 mb-8">
              <h2 className="sm:pl-4 text-2xl font-bold">Avis clients</h2>
              <div onClick={handleForm} className="sm:mr-4 size-6 md:hover:fill-mahogany-950 md:hover:scale-105 transition duration-300">
                <Mark />
              </div>
            </div>
            <div className="absolute sm:hidden top-0 right-0 translate-x-4 -translate-y-4 z-10">
              <div onClick={handleForm} className="flex items-center justify-center size-8 bg-neutral-100 border-neutral-300 border rounded-full">
                <div className="size-5 fill-neutral-950">
                  <Mark />
                </div>
              </div>
            </div>

            <div className="relative flex flex-col sm:col-span-2 sm:mx-4 mb-8">
              <p className="absolute px-1 text-base -top-3 left-4" htmlFor="notes">Note avis :</p>
              <input 
                id="notes"
                type="number"
                min="0"
                max="5"
                step="0.5"
                {...register("notes")}
                className="absolute font-bold text-base text-right -top-3 right-6 bg-neutral-100 w-[52px] outline-none"
                value={note}
                onChange={handleValue}
              />
              <p className="absolute px-1 text-base -top-3 right-0">/5</p>

              {errors?.notes && (
                <p className="absolute text-xs text-red-500 -top-2 left-1/2 -translate-x-1/2">{errors.notes.message}</p>
              )}
              <div on className="flex justify-around mt-4 md:mt-6 mx-4 sm:mx-8 md:mx-16 ">
              {[...Array(5)].map((_, index) => {
              const starType = getStarType(index);
              return (
                <span
                  key={index}
                  className={`size-16 mr-1 ${starType === "full" ? "fill-supernova-500" : "fill-neutral-500"}`}
                  onMouseMove={(e) => handleStarHover(e, index)}
                  onMouseLeave={handleStarLeave}
                  onClick={handleStarClick}
                >
                  {starType === "full" && <Star />}
                  {starType === "half" && <StarUnDemi />}
                  {starType === "empty" && <Star />}
                </span>
              );
            })}
              </div>
            </div>

            <div className="relative flex flex-col sm:col-span-2 sm:mx-4 mb-8">
              <label htmlFor="title" className={`labelForm ${errors?.title ? "to-red-50": "to-neutral-50"}`}>Titre</label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className={`inputFormBase ${errors?.title && "bg-red-50"}`}
                placeholder="Votre titre..."
              />
              {errors?.title && (
                <p className="errorsFormBottom">{errors.title.message}</p>
              )}
            </div>

            <div className="relative flex flex-col sm:col-span-2 sm:mx-4 mb-8">
              <label htmlFor="comments" className={`labelForm ${errors?.comments ? "to-red-50": "to-neutral-50"}`}>Description</label>
              <textarea
                id="comments"
                type="text"
                {...register("comments")}
                className={`h-full inputFormBase resize-none ${errors?.comments && "bg-red-50"}`}
                placeholder="Vos commentaires..."
              />
              {errors?.comments && (
                <p className="errorsFormBottom">{errors.comments.message}</p>
              )}
            </div>
            <div className="flex sm:col-span-2 ">
              <div className="flex flex-1 items-center justify-center">
                <button disabled={isSubmitting} className="bg-neutral-300 py-2 px-4 rounded-xl md:hover:fill-mahogany-950 md:hover:text-mahogany-950 md:hover:bg-supernova-500 transition-all duration-300 md:hover:scale-101 md:hover:shadow-haDark">
                  <div className="flex flex-1 items-center">
                    <div className="mr-2">
                      {isSubmitting ? 
                        <div className="size-4 animate-spin">
                          <Loading />
                        </div>
                       :  
                        <div className="size-4">
                          <Send />
                        </div>
                      } 
                    </div>
                    <h3 className="font-bold">Envoyer</h3>
                  </div>
                </button>
              </div>
            </div>
          </form>
    </div>
  );
}