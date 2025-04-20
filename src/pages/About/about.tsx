import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import "../../styles/about.scss";
import Footer from "../Footer/footer"
import Header from "../Header/header"

const About = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const faqs = [
        {
            id: 1,
            question: "EZMA nima?",
            answer: "EZMA — kutubxonalar va foydalanuvchilar uchun kitoblarni boshqarish va kuzatishni osonlashtiruvchi zamonaviy kutubxona boshqaruv tizimi."
        },
        {
            id: 2,
            question: "Qanday qilib kitob olsam bo'ladi?",
            answer: "Yaqin atrofdagi kutubxonaga tashrif buyurib, kutubxona kartangiz orqali kitob olishingiz mumkin. Jarayon juda oddiy va tez."
        },
        {
            id: 3,
            question: "Olingan kitobni yangilash mumkinmi?",
            answer: "Ha, kitobni onlayn portal orqali yoki kutubxonaga borib yangilashingiz mumkin."
        },
        {
            id: 4,
            question: "Agar kitobni kechikib topsirsam nima bo’ladi?",
            answer: "Kitobni kechikib topshirganingiz uchun kichik miqdorda jarima bo‘lishi mumkin. Bu miqdor kutubxonangiz siyosatiga bog‘liq."
        }
    ];

    const toggleAccordion = (id: number) => {
        setActiveAccordion(activeAccordion === id ? null : id);
    };

    return (
        <div className="about-container">
            <Header />

            <section className="hero-section">
                <h2>Ezma nima?</h2>
                <p>
                    EZMA — kutubxonalar faoliyatini zamonaviylashtirish va jamoalarga xizmat ko‘rsatishni yengillashtirish uchun yaratilgan inqilobiy kutubxona tizimi.
                    Bizning maqsadimiz — innovatsion texnologiyalar orqali bilimni har kimga yetkazish.
                </p>
            </section>

            <section className="carousel-section">
                <h2>Jamoamiz</h2>
                <div className="carousel">
                    <div>
                        <h1>John Doe</h1>
                        <h3>Frontend Dasturchi</h3>
                        <p>5+ yillik tajribaga ega React dasturchisi. Zamonaviy veb-ilovalar yaratishda ixtisoslashgan.</p>
                    </div>

                    <div>
                        <h1>Jane Smith</h1>
                        <h3>Backend Dasturchi</h3>
                        <p>Python/Django mutaxassisi. API ishlab chiqish va ma’lumotlar bazasini optimallashtirish bo‘yicha tajribali.</p>
                    </div>

                    <div>
                        <h1>Mike Johnson</h1>
                        <h3>UI/UX Dizayner</h3>
                        <p>Foydalanuvchi uchun qulay va chiroyli interfeyslar yaratishda ijodiy dizayner.</p>
                    </div>

                </div>
            </section>

            <section className="faq-section">
                <h2>Ko‘p so‘raladigan savollar</h2>
                <div className="accordion">
                    {faqs.map((faq) => (
                        <div className="accordion-item" key={faq.id}>
                            <div
                                className={`accordion-header ${activeAccordion === faq.id ? 'active' : ''}`}
                                onClick={() => toggleAccordion(faq.id)}
                            >
                                <h3>{faq.question}</h3>
                                <IoChevronDown className="icon" />
                            </div>
                            <div className={`accordion-content ${activeAccordion === faq.id ? 'active' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
