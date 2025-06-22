import Image from "next/image";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Early User",
    avatar: "/avatars/sarah.jpg",
    testimonial: "EchoVault has been a revelation. Hearing my own stories back has helped me reconnect with parts of myself I thought I'd lost. It's like a conversation with my own history.",
  },
  {
    name: "Dr. Anil Kumar",
    role: "Geriatric Specialist",
    avatar: "/avatars/anil.jpg",
    testimonial: "As a tool for monitoring cognitive function, this is groundbreaking. The ability to track linguistic patterns over time is invaluable for early detection of neurodegenerative conditions.",
  },
  {
    name: "John M.",
    role: "Caregiver",
    avatar: "/avatars/john.jpg",
    testimonial: "I use EchoVault to stay connected with my mother, who lives in another state. The insights help me understand her state of mind and give us new things to talk about. It brings me peace of mind.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold">Loved by Users and Professionals</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-text-secondary">
          Don't just take our word for it. Here's what people are saying about EchoVault.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-8 rounded-card bg-card-bg shadow-card flex flex-col items-center text-center backdrop-blur-lg border border-card-border">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <p className="mt-6 text-text-secondary italic">"{testimonial.testimonial}"</p>
              <div className="mt-4 font-semibold text-text-primary">{testimonial.name}</div>
              <div className="text-sm text-text-secondary">{testimonial.role}</div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent-yellow fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 