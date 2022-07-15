import React from 'react'
// import '../css/helpUI.css';
import { useTranslation } from "react-i18next";

const Help = () => {
const { t, i18n } = useTranslation();
  return (
    <div className="content-wrapper" >
    <div className="card" >
    <div class="card-body">
                {/* <h3>Salve</h3>
                <p>In questa sezione troverete le risposte alle domande più comuni sul nostro sistema backend.</p> 
                <hr></hr> */}
                <p>
                    <strong>{t("Help.control_panel_title")} </strong>
                </p>
                <div>
                    <p>{t("Help.control_panel_section")}</p>
                    <ul>
                        <li>{t("Help.list_01")}</li>
                        <li>{t("Help.list_02")}</li>
                        <li>{t("Help.list_03")}</li>
                    </ul>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_02")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_02_ans1")} <br></br>
                    {t("Help.Quo_02_ans2")}
                    </p>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_03")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_03_Ans1")} <strong>{t("Help.Quo_03_Ans2")}</strong> {t("Help.Quo_03_Ans3")} 
                    </p>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_04")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_04_Ans1")} <strong>{t("Help.Quo_04_Ans2")}</strong>{t("Help.Quo_04_Ans3")} {t("Help.Quo_04_Ans4")}
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_05")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_05_Ans")}
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_06")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_06_Ans")}
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>{t("Help.Quo_07")}</strong>
                    </p>
                    <p>
                    {t("Help.Quo_07_Ans")}
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>
                        {t("Help.Quo_08")}
                        </strong>
                    </p>
                    <p>
                    {t("Help.Quo_08_p1")} <br></br>                   
                    {t("Help.Quo_08_p2")}
                    </p>
                    <ul>
                        <li>{t("Help.Q8_list1")}</li>
                        <li>{t("Help.Q8_list2")}</li>
                    </ul>
                </div>

            </div>
            {/* <div class="card-body">
                <h3>Help</h3>
                <p>Greetings, In this section you will find answers to the most common questions about our backend system.</p> 
                <hr></hr>
                <p>
                    <strong>What do I find in the Control Panel section?</strong>
                </p>
                <div>
                    <p>In this section you can:</p>
                    <ul>
                        <li>View the total number of appointments (daily, monthly, etc ...)</li>
                        <li>See the total number of patients and view the appointments made.</li>
                        <li>Monitor the progress of appointments through our graph</li>
                    </ul>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>How does the Timetable section work?</strong>
                    </p>
                    <p>
                    In the Timetable section ... you can:
                    Add and modify your general hours, by entering the break times, the days of opening, closing, etc.
                    </p>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>How can I view the patient list?</strong>
                    </p>
                    <p>
                    By simply clicking on the <strong>Patient</strong> item, you can view the complete list of your patients with their personal details and contact information.
                    </p>
                </div>
                <hr></hr>
                <div>
                    <p>
                        <strong>How can I view an appointment made online or enter one?</strong>
                    </p>
                    <p>
                    By simply clicking on the item <strong>Booking</strong>, a huge electronic calendar will open divided into days and time slots, with slots (of different colors).
                    If you want to enter an appointment, just click on the slot on the date and time chosen by the customer and reserve it.
                    While the online appointments will be shown in red with the patient's name and surname, every time a "patient" of yours books online, you will receive a notification.
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>Is it possible to cancel an appointment?</strong>
                    </p>
                    <p>
                    Of course, just click on the slot concerned and press yes to the question ... Are you sure you want to free this slot?
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>Can I choose the theme and layout of my website?</strong>
                    </p>
                    <p>
                    Of course, you will have to click on the layout item, and below you will find the different sections of your website, and for each of them you can choose a theme or insert one, upload the contents (text, images, logos, etc.)
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>Do you also deal with graphics?</strong>
                    </p>
                    <p>
                    Yes, we have a special section called Graphics, where you can choose and send requests to create (business cards, flyers, A3, A4, etc ...)
                    </p>
                </div><hr></hr>
                <div>
                    <p>
                        <strong>
                        Come funziona il pagamento?
                        </strong>
                    </p>
                    <p>
                    In the Payment section <br></br>
                    You can pay in 2 different ways:
                    </p>
                    <ul>
                        <li>Bank transfer</li>
                        <li>By credit / debit card</li>
                    </ul>
                </div>
            </div> */}

        </div>

    </div>
  )
}

export default Help