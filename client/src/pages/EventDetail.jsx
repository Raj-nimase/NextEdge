import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import CountdownTimer from "../components/CountdownTimer.jsx";
import RegistrationWindow from "../components/RegistrationWindow.jsx";
import Footer from "../components/Footer.jsx";
import { getYoutubeVideoId } from "../utils/youtube.js";
import { Calendar, MapPin, Loader2, ArrowLeft, UserPlus } from "lucide-react";

const EventDetail = () => {
  const { eventId } = useParams();
  const { isMember } = useAuth();
  const [event, setEvent] = useState(null);
  const [registered, setRegistered] = useState(false);
  const [regStatusLoading, setRegStatusLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [confirmWord, setConfirmWord] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const eventStart = event
    ? new Date(event.eventStartDate || event.date)
    : null;
  const now = new Date();
  const isPast = eventStart && eventStart <= now;
  const regStart = event?.registrationStartDate ? new Date(event.registrationStartDate) : null;
  const regEnd = event?.registrationEndDate ? new Date(event.registrationEndDate) : null;
  const regOpen = regStart && regEnd && now >= regStart && now <= regEnd;
  const accessType = event?.accessType || "public";
  const membersOnly = accessType === "members";
  const canAttemptRegister =
    !isPast && regOpen && (membersOnly ? isMember : true);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const res = await api.get(`/events/${eventId}`);
      if (res.data?.event) setEvent(res.data.event);
    } catch (err) {
      if (err.response?.status === 404) setEvent(null);
      else console.error(err);
    }
  }, [eventId]);

  const fetchRegistrationStatus = useCallback(async () => {
    if (!eventId) return;
    setRegStatusLoading(true);
    try {
      const res = await api.get(`/events/${eventId}/register/status`);
      setRegistered(res.data?.registered ?? false);
    } catch {
      setRegistered(false);
    } finally {
      setRegStatusLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    if (!event) return;
    fetchRegistrationStatus();
  }, [event, fetchRegistrationStatus]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!canAttemptRegister || registerLoading) return;
    if (!guestName.trim()) {
      setRegisterError("Please enter your name.");
      return;
    }
    if (!membersOnly) {
      if (!guestEmail.trim()) {
        setRegisterError("Please enter your email.");
        return;
      }
      if (confirmWord.trim().toUpperCase() !== "EVENT") {
        setRegisterError("Please type the word EVENT to confirm you're human.");
        return;
      }
    }
    setRegisterError(null);
    setRegisterLoading(true);
    try {
      const body = membersOnly
        ? { name: guestName.trim() }
        : {
            name: guestName.trim(),
            email: guestEmail.trim().toLowerCase(),
            website: honeypot,
            confirmWord: confirmWord.trim(),
          };
      await api.post(`/events/${eventId}/register`, body);
      setRegistered(true);
    } catch (err) {
      setRegisterError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  if (event === undefined) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!event) {
    return (
      <>
        <div className="min-h-screen pt-24 flex flex-col items-center justify-center px-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Event not found.</p>
          <Link
            to="/events"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Back to Events
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>

          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {event.coverImage?.url && (
              <img
                src={event.coverImage.url}
                alt=""
                className="w-full h-64 object-cover"
              />
            )}

            <div className="p-6 md:p-8 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {eventStart &&
                      eventStart.toLocaleString(undefined, {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                  </span>
                  {event.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>

              {event.description && (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              )}

              {/* Event countdown */}
              <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Event starts
                </h2>
                {!isPast ? (
                  <CountdownTimer
                    targetDate={eventStart}
                    endedLabel="Event Started"
                  />
                ) : (
                  <p className="text-lg font-medium text-amber-600 dark:text-amber-400">
                    Event Started
                  </p>
                )}
              </section>

              {/* Registration window */}
              <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Registration
                </h2>
                <RegistrationWindow
                  registrationStartDate={event.registrationStartDate}
                  registrationEndDate={event.registrationEndDate}
                />
              </section>

              {/* Registration form / button */}
              <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                {membersOnly && !isMember && (
                  <p className="text-amber-600 dark:text-amber-400 font-medium mb-4">
                    Members only event.
                    <Link
                      to={`/member-login?returnTo=${encodeURIComponent(`/events/${eventId}`)}`}
                      className="underline hover:no-underline"
                    >
                      Log in as a member
                    </Link>
                    to register.
                  </p>
                )}

                {regStatusLoading ? (
                  <p className="text-gray-500 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking registration…
                  </p>
                ) : registered ? (
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    You are registered for this event.
                  </p>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label
                        htmlFor="guestName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="guestName"
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Your name"
                        className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    {!membersOnly && (
                      <>
                        <div>
                          <label
                            htmlFor="guestEmail"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="guestEmail"
                            type="email"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        {/* Honeypot - hidden from users, bots may fill it */}
                        <div className="absolute -left-[9999px] top-0" aria-hidden="true">
                          <label htmlFor="website">Website</label>
                          <input
                            id="website"
                            name="website"
                            type="text"
                            tabIndex="-1"
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="confirmWord"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                          >
                            To confirm you&apos;re human, type the word <strong>EVENT</strong> below
                          </label>
                          <input
                            id="confirmWord"
                            type="text"
                            value={confirmWord}
                            onChange={(e) => setConfirmWord(e.target.value)}
                            placeholder="EVENT"
                            autoComplete="off"
                            className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </>
                    )}
                    {registerError && (
                      <p className="text-red-600 dark:text-red-400 text-sm">
                        {registerError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={!canAttemptRegister || registerLoading}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {registerLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Registering…
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" />
                          Register
                        </>
                      )}
                    </button>
                  </form>
                )}
              </section>

              {isPast && event.youtubeVideoUrl && (
                <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                    Event Video
                  </h3>
                  <div className="aspect-video w-full max-w-2xl">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(
                        event.youtubeVideoUrl
                      )}?rel=0&modestbranding=1`}
                      title="Event Video"
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </section>
              )}

              {isPast && event.images?.length > 0 && (
                <section className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-gray-100">
                    Event Photos
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {event.images.map((img) => (
                      <img
                        key={img.publicId}
                        src={img.url}
                        alt=""
                        className="rounded-lg object-cover h-40 w-full"
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetail;
