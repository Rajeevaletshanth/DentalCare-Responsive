import React, { useState, useEffect } from 'react'
import configData from '../config.json';
import { CardElement, useElements, useStripe, PaymentElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import '../css/payment.css';
import toast, { Toaster } from "react-hot-toast";
import { useCookies } from 'react-cookie';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
            backgroundColor: "white",
            // paddingTop: "20px",
			iconColor: "black",
			color: "black",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "red",
			color: "red"
		}
	}
}

const PaymentForm = () => {
    const [success, setSuccess] = useState(false);
    const [paid, setPaid] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    const [cookies, setCookie, removeCookie] = useCookies(['admin-info']);
    const username = cookies["admin-info"].username;
    const admin_id = cookies["admin-info"].id;

    const [showPay, setShowPay] = useState("");
    const [showLoading, setShowLoading] = useState("hidden");

    const [holdername, setHolderName] = useState("");
    const [email, setEmail] = useState("")

    useEffect(async() => {
        await axios.get(`${configData.SERVER_URL}/admin/getPayment/${admin_id}`).then((res) => {
            if(res.data.length > 0){
                setSuccess(true)
                setPaid(true);
            }
        })
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        if(!holdername){
            toast.error("Card holder's name cannot be empty!")
        }else if(!email){
            toast.error("Email cannot be empty!")
        }else{     
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })
        
            if(!error){
                setShowPay("hidden");
                setShowLoading("")
                try {               
                    const {id} = paymentMethod;
                    await axios.post(`${configData.SERVER_URL}/admin/payment`,{
                        amount: 1 * 100, id, email, holdername, admin_id
                    }).then((res) =>{
                        if(res.data.success){
                            console.log("Successful Payment");
                            setSuccess(true)
                        }
                    })
                } catch (error) {      
                    toast.error(error)         
                    console.log("Error", error)
                }
            }else{
                // toast.error(error)  
                console.log(error.message)
            }
        }
    }

  return (
    <>
    {!success?
        <form onSubmit={handleSubmit}>
            <Toaster />
            <div class="control-group FormGroup">
                <div class="controls FormRow">
                    <input type="text" placeholder="Card Holder's Name" class="form-control" value={holdername} onChange={(e) => setHolderName(e.target.value)} style={{border: "none transparent", outline: "none"}}/>
                </div>                     
            </div>
            <div class="control-group FormGroup"> 
                <div class="controls FormRow">
                    <input type="email" placeholder="Email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} style={{border: "none transparent", outline: "none"}}/>
                </div>                    
            </div>
            <fieldset className='FormGroup'>
                <div className="FormRow">
                    {/* <CardElement options={CARD_OPTIONS}/> */}
                    <CardElement/>
                </div>
            </fieldset>
            <button type="submit" className='btn btn-primary float-right' hidden={showPay}>Paga</button>
            <button class="btn btn-primary float-right" type="button" hidden={showLoading} disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                &nbsp; Processing...
            </button>
        </form> : paid?
        <div class="ml-4">
            <h4>You've already purchased this product.</h4>
            {/* <label class="control-label">Your payment invoice has been sent to this email address. </label> */}
            {/* <button className='btn btn-success float-right'>Paid</button>            */}
        </div> :
        <div class="ml-4">
            <h4>Payment Successfull</h4>
            <label class="control-label">Your payment invoice has been sent to <a>{email}</a></label>
            <button className='btn btn-success float-right'>Paid</button>           
        </div>
    }
    </>
  )
}

export default PaymentForm