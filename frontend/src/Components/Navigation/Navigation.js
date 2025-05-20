// import React, { useState} from 'react'
// import styled from 'styled-components'
// import avatar from '../../img/avatar.png'
// import { signout } from '../../utils/Icons'
// import { menuItems } from '../../utils/menuItems'
// import { Link} from 'react-router-dom'

// function Navigation({active, setActive}) {
//     return (
//         <NavStyled>
//             <div className="user-con">
//                 <img src={avatar} alt="" />
//                 <div className="text">
//                     <h2>Mike</h2>
//                     <p>Your Money</p>
//                 </div>
//             </div>
//             <ul className="menu-items">
//                 {menuItems.map((item) => {
//                     return <li
//                         key={item.id}
//                         onClick={() => setActive(item.id)}
//                         className={active === item.id ? 'active': ''}
//                     >
//                         {item.icon}
//                         <span>{item.title}</span>
//                     </li>
//                 })}
//             </ul>
//             <div className="bottom-nav">
//             <Link to="/"> 
//                     <li>
//                         {signout} Sign Out
//                     </li>
//                 </Link>
//             </div>
//         </NavStyled>
//     )
// }

// const NavStyled = styled.nav`
//     padding: 2rem 1.5rem;
//     width: 374px;
//     height: 100%;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #FFFFFF;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 2rem;
//     .user-con{
//         height: 100px;
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         img{
//             width: 80px;
//             height: 80px;
//             border-radius: 50%;
//             object-fit: cover;
//             background: #fcf6f9;
//             border: 2px solid #FFFFFF;
//             padding: .2rem;
//             box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
//         }
//         h2{
//             color: rgba(34, 34, 96, 1);
//         }
//         p{
//             color: rgba(34, 34, 96, .6);
//         }
//     }

//     .menu-items{
//         flex: 1;
//         display: flex;
//         flex-direction: column;
//         li{
//             display: grid;
//             grid-template-columns: 40px auto;
//             align-items: center;
//             margin: .6rem 0;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all .4s ease-in-out;
//             color: rgba(34, 34, 96, .6);
//             padding-left: 1rem;
//             position: relative;
//             i{
//                 color: rgba(34, 34, 96, 0.6);
//                 font-size: 1.4rem;
//                 transition: all .4s ease-in-out;
//             }
//         }
//     }

//     .active{
//         color: rgba(34, 34, 96, 1) !important;
//         i{
//             color: rgba(34, 34, 96, 1) !important;
//         }
//         &::before{
//             content: "";
//             position: absolute;
//             left: 0;
//             top: 0;
//             width: 4px;
//             height: 100%;
//             background: #222260;
//             border-radius: 0 10px 10px 0;
//         }
//     }
// `;

// export default Navigation

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import avatarDefault from '../../img/avatar.png';
import { signout } from '../../utils/Icons';
import { menuItems } from '../../utils/menuItems';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navigation({ active, setActive, user }) {
    const BASE_URL = "http://localhost:5000/api/v1/";
    const [avatar, setAvatar] = useState(user?.profilePicUrl || avatarDefault);
    const fileInputRef = useRef(null);

    // Optional: Update avatar if user info updates later
    useEffect(() => {
        setAvatar(user?.profilePicUrl || avatarDefault);
    }, [user]);

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // const handleFileChange = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     //formData.append('image', file); // MUST match multer field name
    //     formData.append('image', file);
    //     formData.append('userId', user._id); // ✅ Send userId to backend

    //     try {
    //         const res = await axios.post(`${BASE_URL}upload-profile-pic`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         const newUrl = res.data.imageUrl;

    //         if (newUrl) {
    //             // Force refresh by appending timestamp to prevent caching
    //             setAvatar(`${newUrl}?v=${Date.now()}`);
    //         }
    //     } catch (err) {
    //         console.error('Upload failed', err);
    //     }
    // };
//     const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('userId', user._id); // ✅ important!

//     try {
//         const res = await axios.post(`${BASE_URL}upload-profile-pic`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });

//         const newUrl = res.data.imageUrl;
//         console.log(newUrl);
//         if (newUrl) {
//             setAvatar(`${newUrl}?v=${Date.now()}`);
//         }
//     } catch (err) {
//         console.error('Upload failed', err);
//     }
// };
const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('image', file);
  formData.append('userId', user._id);

  try {
    const res = await axios.post(`${BASE_URL}upload-profile-pic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const newUrl = res.data.imageUrl;

    if (newUrl) {
      // Update avatar in UI immediately
      setAvatar(`${newUrl}?v=${Date.now()}`);

      // ✅ Update localStorage user
      const updatedUser = { ...user, profilePicUrl: newUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ✅ Optional: Update user state in parent if needed
      // setUser(updatedUser); (if you have a setUser function)
    }
  } catch (err) {
    console.error('Upload failed', err);
  }
};

    return (
        <NavStyled>
            <div className="user-con">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/*"
                />
                <img
                    src={avatar}
                    alt="Profile"
                    onClick={handleAvatarClick}
                    title="Click to change picture"
                    style={{ cursor: 'pointer' }}
                />
                <div className="text">
                    <h2>{user?.name || 'Mike'}</h2>
                    <p>Your Money</p>
                </div>
            </div>

            <ul className="menu-items">
                {menuItems.map((item) => (
                    <li
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={active === item.id ? 'active' : ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>

            <div className="bottom-nav">
                <Link to="/">
                    <li>
                        {signout} Sign Out
                    </li>
                </Link>
            </div>
        </NavStyled>
    );
}

//export default Navigation;
const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }

    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.4rem;
                transition: all .4s ease-in-out;
            }
        }
    }

    .active{
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
`;

export default Navigation