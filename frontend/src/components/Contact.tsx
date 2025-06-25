import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <div className="mt-2 h-1 w-20 bg-emerald-500 mx-auto"></div>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have questions about CARBONSENS? We'd love to hear from you. Reach
            out to our team using the contact information below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Our Location
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      Sup'Com
                      <br />
                      Raoued, El ghazela
                      <br />
                      Ariana, Tunis
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Email Us
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a
                        href="mailto:info@carbonsens.com"
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        mohamed.mdhaffar@supcom.tn
                      </a>
                    </p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a
                        href="mailto:support@carbonsens.com"
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        zaydbenfadhel2003@gmail.com
                      </a>
                    </p>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a
                        href="mailto:support@carbonsens.com"
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        youssefchatti420@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      Call Us
                    </h4>
                    <p className="mt-1 text-gray-600 dark:text-gray-300">
                      <a
                        href="tel:+15551234567"
                        className="hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        +216 99 655 775
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="How can we help?"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-medium transition-transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
