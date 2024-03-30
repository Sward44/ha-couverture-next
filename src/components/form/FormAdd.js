"use client";
import { useRef } from "react";
import React, { useState } from "react";
import styles from "./FormAdd.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function FormAdd({ handleForm }) {
  const [isLoading, setIsLoading] = useState(false);
  // const [popup, setPopup] = useState(true);
  const isFinish = useRef(false);
  const nameRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  const defaultValues = {
    email: "",
  };

  const schema = yup.object({
    email: yup
      .string()
      .required("Email obligatoire")
      .email("Votre email n'est pas conforme"),
    name: yup.string().required("Nom demandé"),
    surname: yup.string().required("Prénom demandé"),
    indicatif: yup.string(),
    number: yup
      .string()
      .matches(nameRegex, "Numéro de téléphone non conforme")
      .required("Numéro de téléphone demandé"),
    comments: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  async function submit(values) {
    try {
      setIsLoading(true);
      clearErrors();
      const newEmail = values;

      let phoneNumberDigits = newEmail.number.replace(/\D/g, "");
      if (phoneNumberDigits.length === 10) {
        let formattedPhoneNumber = `+33${phoneNumberDigits.substring(1)}`;
        newEmail.number = formattedPhoneNumber;
      } else if (phoneNumberDigits.length === 11) {
        let formattedPhoneNumber = `+`;
        newEmail.number = formattedPhoneNumber;
      } else if (phoneNumberDigits.length === 13) {
        let formattedPhoneNumber = `+${phoneNumberDigits.substring(2)}`;
        newEmail.number = formattedPhoneNumber;
      } else {
        newEmail.number = phoneNumberDigits;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/devis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEmail),
        }
      );
      if (response.ok) {
        const newEmailResponse = await response.json();
        isFinish.current = true;
        reset();
      } else {
        setError("generic", {
          type: "generic",
          message: "Problèmes serveurs else",
        });
      }
    } catch (e) {
      setError("generic", {
        type: "generic",
        message: "Problèmes serveurs catch",
      });
    }
    setIsLoading(false);
  }

  return (
    <div className={styles.formulaire}>
      {isLoading && (
        <FontAwesomeIcon
          icon={faSpinner}
          spinPulse
          className={styles.loadingSpin}
        />
      )}
      {isFinish.current ? (
        <div className={`${styles.containerFormulaireAfter} p-20`}>
          <div className={styles.formAfter}>
            <div className={`${styles.start} ${styles.positionEnTeteAfter}`}>
              <h3 className="mb-20">
                Merci nous avons bien reçu votre message, nous vous repondrons
                dans 48h maximum.
              </h3>
            </div>
            <div className={`${styles.envoie} ${styles.positionPiedPageAfter}`}>
              <button className={styles.formatButtonAfter} onClick={handleForm}>
                <h3>Ok</h3>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.containerFormulaire} `}>
          <form onSubmit={handleSubmit(submit)} className={styles.form}>
            <div className={`${styles.start} ${styles.positionEnTete}`}>
              <h2>Devis</h2>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={handleForm}
                size={"2xl"}
              />
            </div>

            <div className={`${styles.prenom} ${styles.position}`}>
              <label htmlFor="surname">Prénom</label>
              <input
                id="surname"
                type="text"
                {...register("surname")}
                className="mb-10"
                placeholder="Votre prénom..."
              />
              {errors?.surname && (
                <p className={styles.errors}>{errors.surname.message}</p>
              )}
            </div>

            <div className={`${styles.nom} ${styles.position}`}>
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="mb-10"
                placeholder="Votre nom..."
              />
              {errors?.name && (
                <p className={styles.errors}>{errors.name.message}</p>
              )}
            </div>

            <div className={`${styles.email} ${styles.position}`}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                {...register("email")}
                defaultValues={"email"}
                className={`${styles.email} mb-10`}
                placeholder="Votre email..."
              />
              {errors?.email && (
                <p className={styles.errors}>{errors.email.message}</p>
              )}
            </div>

            <div className={`${styles.phone} ${styles.position}`}>
              <label htmlFor="number">N° de téléphone</label>
              <input
                id="number"
                type="text"
                {...register("number")}
                className=" mb-10"
                placeholder="Votre n° de téléphone..."
              ></input>
              {errors?.number && (
                <p className={styles.errors}>{errors.number.message}</p>
              )}
            </div>

            <div className={`${styles.demande} ${styles.position}`}>
              <label htmlFor="comments">Demande précis</label>
              <textarea
                id="comments"
                type="text"
                {...register("comments")}
                className="mb-20"
                placeholder="Préciser votre demande..."
              />
            </div>
            <div className={`${styles.envoie} ${styles.positionPiedPage}`}>
              <button disabled={isSubmitting} className={styles.formatButton}>
                <div className={styles.positionButton}>
                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    size={"lg"}
                    className="mr-10"
                  />
                  <h3>Envoyer</h3>
                </div>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default FormAdd;
