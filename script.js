import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA3yvvUITyiYFVOg-FpyvoAgOCt4CwsoCY",
  authDomain: "entry-log-1522f.firebaseapp.com",
  projectId: "entry-log-1522f",
  storageBucket: "entry-log-1522f.firebasestorage.app",
  messagingSenderId: "914260884806",
  appId: "1:914260884806:web:e8204081e381aea649b947",
  measurementId: "G-X2GHKSJRQ0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const numberInput = document.getElementById("numberInput");
const alphabetInput = document.getElementById("alphabetInput");
const mixedInput = document.getElementById("mixedInput");
const saveButton = document.getElementById("saveButton");
const dataList = document.getElementById("dataList");

saveButton.addEventListener("click", async () => {
    const mobileNumber = numberInput.value.trim();
    const name = alphabetInput.value.trim();
    const carNumber = mixedInput.value.trim();
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

    if (!mobileNumber && !name && !carNumber) {
        alert("Please fill at least one field!");
        return;
    }

    try {
        await addDoc(collection(db, "savedData"), {
            mobileNumber: mobileNumber || null,
            name: name || null,
            carNumber: carNumber || null,
            timestamp: timestamp
        });
        alert("Data saved successfully!");
        numberInput.value = "";
        alphabetInput.value = "";
        mixedInput.value = "";
        displayData();
    } catch (error) {
        console.error("Error saving data:", error);
    }
});

async function displayData() {
    dataList.innerHTML = ""; 
    try {
        const q = query(collection(db, "savedData"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                Mobile Number: ${data.mobileNumber || "N/A"}<br>
                Name: ${data.name || "N/A"}<br>
                Car Number: ${data.carNumber || "N/A"}<br>
                Time: ${data.timestamp}
            `;
            dataList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error retrieving data:", error);
    }
}

displayData();

