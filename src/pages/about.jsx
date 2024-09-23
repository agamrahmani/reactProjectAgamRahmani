import PageHeader from "../components/common/pageHeader";
import Logo from "../components/logo";
import { Card, ListGroup } from 'react-bootstrap';
import { useDarkMode } from "../contexts/darkModeContext";

function About() {
    const { darkMode } = useDarkMode();
    return (
        <div className="container">
            <PageHeader
                title={
                    <>
                        About <Logo />
                    </>
                }
                description= {<>
                Welcome to <span className="fw-bold"><Logo /> </span> a cutting-edge platform for easily creating and browsing business cards with a user-friendly interface. <br /> Our site caters to all businesses, from small to large, across various industries. <br /> We can help you find a business you're looking for by its name, or you can create and publish a business card for your own business. </>}
                />
                <br />
                <h2 className="text-start">What we offer</h2>
            <Card className={`text-start ${darkMode ? "bg-dark" : "bg-light"}`} style={{ height: "auto"}}>
                <ListGroup variant="flush">
                    <ListGroup.Item variant={darkMode ? "dark" : ""}><span className="fw-bold">Browse:</span> You can view all the business cards available in our app. You can browse through the site, and at the bottom of the page, you have a pagination bar that allows you to navigate between pages and see more and more cards. Another option is through the navigation bar, which has a search feature where you can enter the name of a topic you're interested in. If a business card with that name exists, it will appear for you.</ListGroup.Item>
                    <ListGroup.Item variant={darkMode ? "dark" : ""}><span className="fw-bold">Create:</span> By creating a business account, you will be able to create your own business cards by clicking the "+" button, and anyone visiting the site will be able to see them. Additionally, you will have the option to edit or delete them at any time. To find only the cards you have created, you can go to the "MY CARDS" page. As a business account holder, you will also be able to favorite cards by marking them with a heart icon, and they will appear on the "FAV CARDS" page.</ListGroup.Item>
                    <ListGroup.Item variant={darkMode ? "dark" : ""}><span className="fw-bold">Edit:</span> If you are logged in as a user (regardless of whether it is a business or personal account), you can edit your personal information as needed. To edit, click on your profile icon, which will open the option to update your details.</ListGroup.Item>
                </ListGroup>
            </Card>
            <br />
            <h2 className="text-start">Contact us!</h2>
            <ul className="text-start">
                <li>email: infinityBusinesses@gmail.com</li>
                <li>Phone: 0503044801</li>
                <li> Adress: Hfikus 11, Rishon Le Zion, Israel</li>
            </ul>
        </div>
    );
}

export default About;


;
