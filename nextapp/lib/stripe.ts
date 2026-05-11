import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

// apiVersion omitted — uses the version pinned to the installed stripe package
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
