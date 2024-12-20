"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/context/AdminContext";

export default function SignUp() {
  const { isAdmin, setIsAdmin } = useAdmin();

  const [success, setSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    email: "",
    admin: false,
  });
  const router = useRouter();

  const formIsValid = Object.values(fields).filter(
    (val: any) => val?.length === 0
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(false);
    setSuccess(false);
    if (formIsValid.length === 0) {
      setSuccess(true);
      setTimeout(() => {
        router.push("/happenings");
      }, 500);
    } else {
      setFormError(true);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = event.target;

    if (name === "admin") {
      setIsAdmin(checked);
      setFields((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    if (name !== "admin") {
      setIsAdmin(false);
    }
  };

  return (
    <section className="mx-auto max-w-xl" data-testid="sign_up">
      <h2 className="mb-4 text-xl font-bold" data-testid="title">
        Logg inn
      </h2>
      <form data-testid="form" onSubmit={handleSubmit} noValidate>
        <label className="mb-4 flex" htmlFor="name">
          <span className="mb-1 mr-2 font-semibold">Navn*</span>
          <input
            className="rounded"
            data-testid="form_name"
            type="text"
            name="name"
            id="name"
            value={fields.name}
            onChange={handleChange}
          />
        </label>

        <label className="mb-4 flex" htmlFor="email">
          <span className="mb-1 mr-2 font-semibold">Epost*</span>
          <input
            className="rounded"
            data-testid="form_email"
            type="email"
            name="email"
            id="email"
            value={fields?.email}
            onChange={handleChange}
          />
        </label>
        <label className="mb-4 flex" htmlFor="admin">
          <span className="mb-1 mr-2 font-semibold">Admin</span>
          <input
            className="rounded"
            data-testid="form_admin"
            type="checkbox"
            name="admin"
            id="admin"
            checked={isAdmin}
            onChange={handleChange}
          />
        </label>
        <button
          className="mt-8 rounded bg-emerald-600 px-10 py-2 text-center text-base text-white"
          data-testid="form_submit"
          type="submit"
        >
          Logg inn
        </button>
        {formError ? (
          <p className="font-semibold text-red-500" data-testid="form_error">
            Fyll ut alle felter med *
          </p>
        ) : null}
        {success ? (
          <p
            className="font-semibold text-emerald-500"
            data-testid="form_success"
          >
            Logget inn
          </p>
        ) : null}
      </form>
    </section>
  );
}
