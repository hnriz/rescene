import React from 'react';
import BackButton from '../components/BackButton';

class Privacy extends React.Component {
  render() {
    return (
      <>
        <BackButton />
        <main>
          <div className="container-privacy">
          <h1>Privacy</h1>

          <div className="text-privacy">

            <div className="titulo-privacy">
              <h2>Privacy Terms</h2>
              <p>
                This Privacy Policy aims to clarify how we collect, use,
                store, and protect user data on our movie and series review website.
                By using our services, you agree to the practices described below.
              </p>
            </div>

            <div className="p-privacy">
              <h3>1. Information Collection</h3>
              <p>We collect personal and non-personal information from users, such as:</p>
              <ul className="lista-privacy">
                <li className="li-privacy">
                  <p>• Registration data: name, email, username, and password when the user creates an account.</p>
                </li>
                <li className="li-privacy">
                  <p>• Usage information: review history, comments, likes, personalized lists, and preferences.</p>
                </li>
                <li className="li-privacy">
                  <p>• Technical information: IP address, browser type, device, operating system, and access data.</p>
                </li>
              </ul>
            </div>

            <div className="p-privacy">
              <h3>2. Use of Information</h3>
              <p>The information collected is used to:</p>
              <ul className="lista-privacy">
                <li className="li-privacy"><p>• Enable proper functioning of the website and its features;</p></li>
                <li className="li-privacy"><p>• Personalize the user experience, such as movie and series recommendations;</p></li>
                <li className="li-privacy"><p>• Improve our services and content based on user behavior;</p></li>
                <li className="li-privacy"><p>• Contact the user when necessary (such as account updates or important notices);</p></li>
                <li className="li-privacy"><p>• Prevent fraudulent activities or misuse of the platform.</p></li>
              </ul>
            </div>

            <div className="p-privacy">
              <h3>3. Data Sharing</h3>
              <p>
                We do not sell, exchange, or rent users' personal data to third parties. We may share information in the following situations:
              </p>
              <ul className="lista-privacy">
                <li className="li-privacy"><p>• With partners and service providers who assist in operating the website, under confidentiality agreements;</p></li>
                <li className="li-privacy"><p>• When required by law, court order, or competent authority;</p></li>
                <li className="li-privacy"><p>• To protect the rights, property, and security of the website, users, or the public.</p></li>
              </ul>
            </div>

            <div className="p-privacy">
              <h3>4. Storage and Security</h3>
              <p>
                We adopt technical and administrative measures to protect personal data against unauthorized access,
                leaks, or any form of inappropriate handling. <br /><br />
                Information is stored on secure servers, which may be located in Brazil or abroad,
                respecting applicable legislation.
              </p>
            </div>

            <div className="p-privacy">
              <h3>5. Cookies and Similar Technologies</h3>
              <p>
                We use cookies to improve navigation, understand user behavior, and offer more relevant content.
                Users can disable cookies in their browser settings, although this may impact the functioning of some website features.
              </p>
            </div>

            <div className="p-privacy">
              <h3>6. User Rights</h3>
              <p>According to the General Data Protection Law (LGPD), users have the right to:</p>
              <ul className="lista-privacy">
                <li className="li-privacy"><p>• Access their personal data;</p></li>
                <li className="li-privacy"><p>• Correct incorrect or outdated data;</p></li>
                <li className="li-privacy"><p>• Request deletion of their data;</p></li>
                <li className="li-privacy"><p>• Revoke consent for data use, when applicable.</p></li>
              </ul>
            </div>

            <div className="p-privacy">
              <h3>7. Changes to This Policy</h3>
              <p>
                This Privacy Policy may be updated periodically. We recommend regular reading to stay informed.
                Relevant changes will be communicated through the website or by email.
              </p>
            </div>

            <div className="p-privacy">
              <h3>8. Contact</h3>
              <p>
                For questions, suggestions, or requests related to privacy and data protection, please contact us:
              </p>
              <ul className="lista-privacy">
                <li className="li-privacy"><p>• Email: escola.pji2@gmail.com</p></li>
                <li className="li-privacy"><p>• Data Processing Officer: 2nd Year IFSP Caraguatatuba</p></li>
              </ul>
            </div>

          </div>
        </div>
        </main>
      </>
    );
  }
}

export default Privacy;