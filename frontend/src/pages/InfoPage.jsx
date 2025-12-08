import React from 'react';
import './StyleHub.css';

const pageContent = {
    about: {
        title: "The Maison",
        subtitle: "Redefining Personal Style Through Intelligence",
        content: `
            <div class="editorial-text">
                <p class="drop-cap">F</p>
                <p>ounded in 2024, AisleAI was born from a singular, ambitious vision: to democratize the luxury of personal styling through the precision of artificial intelligence. We believe that fashion is not merely about clothing; it is a profound form of self-expression, a language of confidence, and a reflection of identity.</p>
                <p>In a world saturated with fleeting trends and fast fashion, finding pieces that truly resonate with one's unique essence—body shape, color season, and lifestyle—has become an elusive art, traditionally reserved for the few with access to private stylists. AisleAI changes this paradigm.</p>
                
                <h3>Our Philosophy</h3>
                <p>We operate at the intersection of high fashion and deep learning. Our proprietary algorithms do not just "match" items; they understand the nuances of drape, fabric, and fit. They analyze thousands of data points to curate a wardrobe that feels like it was hand-picked by a master couturier who has known you for years.</p>
                
                <h3>The AisleAI Difference</h3>
                <p>Unlike traditional e-commerce platforms, we do not overwhelm you with endless choices. We offer a curated sanctuary. Every recommendation is a result of rigorous analysis, ensuring that what you see is not just what is popular, but what is <em>perfect for you</em>.</p>
                <p>We partner with the world's most esteemed maisons and visionary emerging designers, bridging the gap between heritage craftsmanship and modern technology. This is not just shopping; it is a journey of self-discovery.</p>

                <h3>Innovation & Heritage</h3>
                <p>While our engine is built on cutting-edge neural networks, our soul is rooted in the timeless traditions of fashion. We respect the history of design, the quality of materials, and the art of tailoring. Our AI is trained by human stylists, ensuring that every algorithmic decision is guided by taste and empathy.</p>
            </div>
        `
    },
    sustainability: {
        title: "Conscious Luxury",
        subtitle: "Our Commitment to the Planet",
        content: `
            <div class="editorial-text">
                <p class="drop-cap">A</p>
                <p>t AisleAI, we believe that true luxury must be responsible. The future of fashion is circular, ethical, and transparent. We recognize the industry's profound impact on our environment and are dedicated to driving a paradigm shift towards conscious consumption.</p>
                
                <h3>Ethical Curation</h3>
                <p>Our AI is programmed to prioritize quality over quantity. By recommending pieces designed to last—both in style and durability—we encourage a departure from the disposable culture of fast fashion. We rigorously vet our brand partners, ensuring they adhere to the highest standards of fair labor and environmental stewardship.</p>
                
                <h3>Carbon Neutrality</h3>
                <p>We are proud to offset 100% of the carbon emissions generated from our global logistics network. From the moment an order is placed to the moment it arrives at your doorstep, every mile is accounted for. We invest in certified reforestation and renewable energy projects to balance our footprint.</p>

                <h3>The Circular Initiative</h3>
                <p>We are piloting a "Pre-Loved" program, allowing our clients to resell their AisleAI purchases directly through our platform. This initiative extends the lifecycle of luxury garments, ensuring that craftsmanship is honored and waste is minimized. We believe that a beautiful garment should have many lives.</p>
            </div>
        `
    },
    careers: {
        title: "Join the Atelier",
        subtitle: "Crafting the Future of Fashion Tech",
        content: `
            <div class="editorial-text">
                <p>We are always looking for visionary talent to join our team. If you are passionate about the intersection of luxury fashion, artificial intelligence, and human-centric design, we want to hear from you.</p>
                
                <h3>Our Culture</h3>
                <p>We foster a culture of creativity, collaboration, and continuous learning. We believe that the best ideas come from diverse perspectives, and we are committed to building an inclusive environment where everyone can thrive.</p>

                <h3>Current Opportunities</h3>
                <div class="contact-grid">
                    <div class="contact-card">
                        <h4>Senior AI Engineer</h4>
                        <p>New York / Remote</p>
                        <p>Lead the development of our core recommendation engine using state-of-the-art LLMs and computer vision.</p>
                    </div>
                    <div class="contact-card">
                        <h4>Fashion Director</h4>
                        <p>Paris / London</p>
                        <p>Curate our brand partnerships and define the aesthetic direction of the platform.</p>
                    </div>
                    <div class="contact-card">
                        <h4>Client Experience Lead</h4>
                        <p>Remote</p>
                        <p>Ensure our high-net-worth clients receive impeccable service.</p>
                    </div>
                    <div class="contact-card">
                        <h4>UX/UI Designer</h4>
                        <p>Remote</p>
                        <p>Craft intuitive and beautiful digital experiences that delight our users.</p>
                    </div>
                </div>
                <p>Please send your CV and portfolio to <strong>careers@aisleai.com</strong>.</p>
            </div>
        `
    },
    contact: {
        title: "Concierge",
        subtitle: "We Are Here to Assist",
        content: `
            <div class="editorial-text">
                <p>Our dedicated concierge team is available to assist you with styling advice, order inquiries, and detailed product information. We strive to provide a service level akin to a private luxury boutique.</p>
                
                <div class="contact-grid">
                    <div class="contact-card">
                        <h4>Client Services</h4>
                        <p>Email: concierge@aisleai.com</p>
                        <p>Phone: +1 (800) 555-0199</p>
                        <p>Hours: Mon-Fri, 9am - 8pm EST</p>
                    </div>
                    <div class="contact-card">
                        <h4>Styling Appointments</h4>
                        <p>Email: styling@aisleai.com</p>
                        <p>Book a virtual consultation with our experts.</p>
                    </div>
                    <div class="contact-card">
                        <h4>Press & Partnerships</h4>
                        <p>Email: press@aisleai.com</p>
                    </div>
                </div>
                <h3>Headquarters</h3>
                <p>123 Fashion Avenue, Penthouse Suite<br>New York, NY 10018<br>United States</p>
            </div>
        `
    },
    shipping: {
        title: "Shipping & Delivery",
        subtitle: "Global Reach, Local Care",
        content: `
            <div class="editorial-text">
                <p>We offer worldwide shipping to over 100 countries. All orders are processed with the utmost care and packaged in our signature sustainable luxury packaging.</p>
                
                <h3>Shipping Options</h3>
                <ul>
                    <li><strong>Standard Shipping</strong> (5-7 business days): Complimentary for orders over $200.</li>
                    <li><strong>Express Shipping</strong> (2-3 business days): $25 flat rate.</li>
                    <li><strong>Next Day Delivery</strong>: $40 (Available in NYC, London, Paris).</li>
                </ul>
                
                <h3>Customs & Duties</h3>
                <p>For international orders, duties and taxes are calculated at checkout. There are no hidden fees upon delivery. We handle all customs clearance processes to ensure a seamless experience.</p>

                <h3>Tracking Your Order</h3>
                <p>Once your order has been dispatched, you will receive a confirmation email containing your tracking number and a link to monitor your package's journey.</p>
            </div>
        `
    },
    returns: {
        title: "Returns & Exchanges",
        subtitle: "Seamless & Worry-Free",
        content: `
            <div class="editorial-text">
                <p>We want you to be completely delighted with your AisleAI purchase. If for any reason you are not, we offer a complimentary return service within 30 days of delivery.</p>
                
                <h3>The Process</h3>
                <ol>
                    <li>Log in to your account and navigate to "My Orders".</li>
                    <li>Select the item(s) you wish to return and the reason.</li>
                    <li>Print the prepaid shipping label provided.</li>
                    <li>Pack the items in their original packaging and attach the label.</li>
                    <li>Drop off the package at any authorized carrier location.</li>
                </ol>
                
                <h3>Refund Policy</h3>
                <p>Refunds will be processed to the original payment method within 5-7 business days of receiving the return. Please note that items must be unworn, unwashed, and with all original tags attached.</p>
            </div>
        `
    },
    faq: {
        title: "Frequently Asked Questions",
        subtitle: "Common Inquiries",
        content: `
            <div class="editorial-text">
                <h3>How does the AI Stylist work?</h3>
                <p>Our AI Stylist uses advanced machine learning to analyze your preferences, body shape, and color season. It then scans our catalog to recommend products that are mathematically and aesthetically perfect for you.</p>
                
                <h3>Are the products authentic?</h3>
                <p>Absolutely. We guarantee that all products sold on AisleAI are 100% authentic and sourced directly from the brands or authorized luxury retailers.</p>
                
                <h3>Do you offer personal styling?</h3>
                <p>Yes, in addition to our AI tools, we offer virtual consultations with human fashion experts for our premium members.</p>

                <h3>Can I change my order?</h3>
                <p>We process orders quickly, but if you need to make a change, please contact our customer care team immediately. We will do our best to accommodate your request.</p>
            </div>
        `
    },
    press: {
        title: "In The Press",
        subtitle: "AisleAI in the Media",
        content: `
            <div class="editorial-text">
                <p>AisleAI has been recognized as a pioneer in the fashion-tech space.</p>
                
                <h3>Recent Features</h3>
                <ul>
                    <li><strong>Vogue</strong> - "The Future of Personal Styling is Here"</li>
                    <li><strong>TechCrunch</strong> - "AisleAI Raises Series A to Revolutionize Fashion E-commerce"</li>
                    <li><strong>Harper's Bazaar</strong> - "Why Every Fashionista Needs This App"</li>
                    <li><strong>Business of Fashion</strong> - "The New Era of AI-Driven Retail"</li>
                </ul>
                
                <h3>Awards</h3>
                <p>We are honored to have received the "Best Fashion Tech Innovation" award at the Global Fashion Awards 2024.</p>

                <p>For press inquiries and media kits, please contact press@aisleai.com.</p>
            </div>
        `
    },
    privacy: {
        title: "Privacy Policy",
        subtitle: "Your Data, Protected",
        content: `
            <div class="editorial-text">
                <p>Your privacy is of utmost importance to us. This policy outlines how we collect, use, and protect your personal information.</p>
                
                <h3>Data Collection</h3>
                <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or communicate with us. This includes your name, email address, shipping address, and payment information.</p>
                
                <h3>Data Usage</h3>
                <p>We use your information to provide, maintain, and improve our services, including personalized recommendations. We do not sell your personal data to third parties.</p>

                <h3>Security</h3>
                <p>We implement industry-standard security measures, including encryption and secure socket layer (SSL) technology, to safeguard your data.</p>
            </div>
        `
    },
    terms: {
        title: "Terms of Service",
        subtitle: "Legal Information",
        content: `
            <div class="editorial-text">
                <p>Welcome to AisleAI. By accessing or using our website, you agree to be bound by these Terms of Service.</p>
                
                <h3>Use of Service</h3>
                <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable federal, state, local, or international law.</p>
                
                <h3>Intellectual Property</h3>
                <p>The content, features, and functionality of AisleAI are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

                <h3>Limitation of Liability</h3>
                <p>In no event shall AisleAI be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
            </div>
        `
    },
    cookies: {
        title: "Cookie Policy",
        subtitle: "Enhancing Your Experience",
        content: `
            <div class="editorial-text">
                <p>We use cookies to enhance your browsing experience and analyze our traffic.</p>
                
                <h3>What are Cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you use our site.</p>
                
                <h3>Types of Cookies We Use</h3>
                <ul>
                    <li><strong>Essential Cookies:</strong> Necessary for the website to function.</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the website.</li>
                    <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization.</li>
                </ul>

                <h3>Managing Cookies</h3>
                <p>You can control and manage cookies in your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>
            </div>
        `
    },
    "size-guide": {
        title: "Size Guide",
        subtitle: "Find Your Perfect Fit",
        content: `
            <div class="editorial-text">
                <p>Finding the perfect fit is essential. Use our size guide to find your measurements.</p>
                
                <h3>Women's Size Chart</h3>
                <table style="width:100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #eee;">
                    <tr style="border-bottom: 1px solid #eee; text-align: left; background: #f9f9f9;">
                        <th style="padding: 15px;">Size</th>
                        <th style="padding: 15px;">Bust (in)</th>
                        <th style="padding: 15px;">Waist (in)</th>
                        <th style="padding: 15px;">Hips (in)</th>
                    </tr>
                    <tr><td style="padding: 15px;">XS</td><td style="padding: 15px;">32-33</td><td style="padding: 15px;">24-25</td><td style="padding: 15px;">34-35</td></tr>
                    <tr style="background: #fdfdfd;"><td style="padding: 15px;">S</td><td style="padding: 15px;">34-35</td><td style="padding: 15px;">26-27</td><td style="padding: 15px;">36-37</td></tr>
                    <tr><td style="padding: 15px;">M</td><td style="padding: 15px;">36-37</td><td style="padding: 15px;">28-29</td><td style="padding: 15px;">38-39</td></tr>
                    <tr style="background: #fdfdfd;"><td style="padding: 15px;">L</td><td style="padding: 15px;">38-40</td><td style="padding: 15px;">30-32</td><td style="padding: 15px;">40-42</td></tr>
                    <tr><td style="padding: 15px;">XL</td><td style="padding: 15px;">41-43</td><td style="padding: 15px;">33-35</td><td style="padding: 15px;">43-45</td></tr>
                </table>

                <h3>Measuring Tips</h3>
                <p><strong>Bust:</strong> Measure around the fullest part of your bust.</p>
                <p><strong>Waist:</strong> Measure around your natural waistline.</p>
                <p><strong>Hips:</strong> Measure around the fullest part of your hips.</p>
            </div>
        `
    }
};

function InfoPage({ type }) {
    const data = pageContent[type] || pageContent.default;

    return (
        <div className="style-hub-white" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Hero Section */}
            <div className="info-hero">
                <h1 className="info-title">{data.title}</h1>
                {data.subtitle && <p className="info-subtitle">{data.subtitle}</p>}
            </div>

            {/* Content Section */}
            <div className="style-hub-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px', flex: 1 }}>
                <div
                    className="info-content"
                    dangerouslySetInnerHTML={{ __html: data.content }}
                />
            </div>
        </div>
    );
}

export default InfoPage;
