import React from 'react';
import BackButton from '../components/BackButton';

class Terms extends React.Component {
    render() {
        return (
            <>
                <BackButton />
                <div className="container-terms">
                <h1>Terms of Use</h1>

                <div className="text-terms">
                    <div className="titulo-terms">
                        <h2>Terms</h2>
                        <p>
                            Last update: 09/17/2025 <br />
                            <br /> Welcome to our service! By accessing or using the platform, you agree to the Terms of Use. Please read carefully.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>1. Acceptance of Terms</h3>
                        <p>
                            By using this Service, you declare that you have read, understood, and agree
                            to comply with these Terms of Use, as well as our Privacy Policy. If you do not agree with these terms, please do not
                            use the Service.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>2. Permitted Use</h3>
                        <p>
                            You agree to use the Service only for legal purposes and in
                            accordance with applicable laws. It is prohibited to:
                        </p>

                        <ul className="lista-terms">
                            <li className="li-terms">
                                <p>• Use the Service for illegal or unauthorized purposes;</p>
                            </li>
                            <li className="li-terms">
                                <p>• Violate the rights of third parties;</p>
                            </li>
                            <li className="li-terms">
                                <p>
                                    • Interfere with the operation of the system or attempt to access
                                    restricted areas.
                                </p>
                            </li>
                        </ul>
                    </div>

                    <div className="p-terms">
                        <h3>3. Registration and Account</h3>
                        <p>
                            Some features may require the creation of an account. When
                            registering, you commit to providing truthful, complete, and up-to-date information. You are responsible for maintaining the
                            confidentiality of your password and for all activities carried out
                            on your account.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>4. Intellectual Property</h3>
                        <p>
                            All content available on the Service (texts, images, logos,
                            trademarks, code, etc.) is protected by copyright and belongs
                            to the Service owner or third-party licensors. It is prohibited to
                            copy, reproduce, or distribute any part of the content without
                            prior authorization.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>5. Modifications to the Service</h3>
                        <p>
                            We reserve the right to modify, suspend, or discontinue,
                            temporarily or permanently, any part of the Service, with
                            or without prior notice. We will not be responsible for any
                            modification, suspension, or discontinuation of the Service.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>6. Disclaimer of Liability</h3>
                        <p>
                            Use of the Service is at your own risk. We do not guarantee that the
                            Service will always be available, error-free, or secure. Under
                            no circumstances will we be responsible for direct, indirect, or consequential damages arising from the use or inability to
                            use the Service.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>7. Termination</h3>
                        <p>
                            We may terminate or suspend your access to the Service, at our
                            discretion, at any time, without prior notice, in case of violation
                            of these Terms.
                        </p>
                    </div>

                    <div className="p-terms">
                        <h3>8. Changes to the Terms</h3>
                        <p>
                            These Terms of Use may be updated periodically.
                            We recommend that you review them frequently. Continued use of the
                            Service after changes constitutes acceptance of the new conditions.
                        </p>
                    </div>
                </div>
                </div>
            </>
        );
    }
}


export default Terms;