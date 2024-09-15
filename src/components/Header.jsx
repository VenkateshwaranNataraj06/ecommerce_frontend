import React , { useState ,useContext,useEffect}from 'react'
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 
import { Link ,useLocation} from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import vklogo from '../image/logoshop.png';
import AuthContext from '../context/AuthContext';
import {  Box, IconButton,TextField ,Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ProductContext from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../components/css/banner.css'
import UserContext from '../context/UserContext';


export default function Header() {
   const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true); 
  const {authToken,setAuthToken,logout,userRole,setUserRole} = useContext(AuthContext);
  const{products,cartlength, setCartlength ,filteredProducts, setFilteredProducts,filter,  setFilter}=useContext(ProductContext)
  const{username,setUserName}=useContext(UserContext)
// console.log(userRole);


  useEffect(() => {
    const role = Cookies.get('userRole');
    setUserRole(role);
    setLoading(false);
    // console.log("role jheader>>>>>>>>>>>",role);

  
    
  }, [authToken, setUserRole]);

  
  const navigate=useNavigate()
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const [searchQuery, setSearchQuery] = useState('');

  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 
  const handleSearchChange = (event) => {
    if(userRole==='admin')
    {
      navigate('/adminproduct')
      setFilter(true)
    }
    else{
      navigate('/product')
      setFilter(true)
    }
  
  
    setSearchQuery(event.target.value);
    if (event.target.value.trim() === '') {

      setFilter(false);
      navigate('/')

      
    } 
    const lowercasedQuery = event.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      product.description.toLowerCase().includes(lowercasedQuery)||product?.category?.name.toLowerCase().includes(lowercasedQuery)
    );
    // console.log(filtered,"filteredPOIIIIIIIIIIIII");
     setFilteredProducts(filtered);
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <header className="bg-[#F5A4F1] text-white py-1 ">
        <div className="mx-auto flex justify-between items-center ">
          <div className="text-2xl font-bold flex  ">
            <div>  <img src={vklogo} alt="we" className=' h-20 w-36 ml-2 max-w-[500px]:h-16 max-w-[500px]:w-32 rounded-full ml-1' />
            </div>
          </div>
          <div className='text-center ml-[5%]'>
            <TextField
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search Here'
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={() => handleSearchChange({ target: { value: searchQuery } })}>
                      <SearchIcon

                        sx={{
                          display: { xs: 'none', sm: 'block' },
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
                style: {
                  height: '40px',

                },
                classes: {
                  root: 'bg-gray-100 text-white',
                  input: 'text-white placeholder:text-gray-400',
                },
                sx: {
                  '& .MuiInputBase-root': {
                    padding: '30px',
                  },
                  '& .MuiInputBase-input': {
                    paddingLeft: { xs: '5px', sm: '40px' },

                  },
                },
              }}
              InputLabelProps={{
                classes: {
                  root: 'text-gray-400',
                },
              }}

            />

          </div>

          <nav className='mt-2 max-[400px]:mt-2'>
            <ul className="flex space-x-4 mt-2 ml-2 mr-4 max-[400px]:space-x-1 mr-2">
              <li className='max-[400px]:ml-4'> {userRole !== 'admin' ? (<Link to='/' className="  hover:bg-[#EA84E5] p-2 rounded-lg text-lg font-semibold "> Home</Link>) : (<Link to='/adminhome' className="  hover:bg-[#EA84E5] p-2 rounded-lg text-lg font-semibold "> Home</Link>)
 
              }
              </li>
              <li>

                {userRole !== 'admin' && <Link to='/cart' className="relative flex flex-col items-center justify-center hover:bg-[#EA84E5] rounded-lg p-2">
                  <span className="absolute -top-5 text-base text-red-600 font-bold">
                    {cartlength}
                  </span>
                 <ShoppingCartIcon style={{ marginTop: '-9px', fontSize: '30px' }} />  </Link>}</li>
              {/* <li>
                  <Link to="/whislist" className="block p-2 mr-2  hover:bg-[#D09FCE] hover:text-white  text-lg">
                    whislist
                  </Link>

                </li> */}
             <li onMouseOverCapture={toggleDrawer}> <Avatar
                sx={{ width: 32, height: 32, bgcolor: 'gray' }}
              >
              </Avatar>
              </li>
            </ul>
          </nav>
        </div>


        <aside
          className={`fixed top-0 right-0 w-64 bg-white text-gray-700 min-h-screen rounded-lg shadow-lg transform  z-10  ${isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
          onMouseLeave={() => setIsOpen(false)}  onClick={() => setIsOpen(false)}>
          <Box display="flex" justifyContent="flex-end">
            <IconButton
              color="inherit"
              onClick={toggleDrawer}

            >
              <CloseIcon className="hover:bg-red-600" />
            </IconButton>
          </Box>

          {!authToken && (
            <nav className="mt-2 pl-4 text-center font-semibold">
              <ul>
                <li>
                  <Link to="/user" className="block p-2 hover:bg-[#D09FCE] hover:text-white  text-lg">Profile</Link>
                </li>
                <li>
                  <Link to="/login" className="block p-2 mr-2  hover:bg-[#D09FCE] hover:text-white  text-lg">
                    Login
                  </Link>

                </li>
                <li>
                  <Link to="/signup" className="block p-2 hover:bg-[#D09FCE] hover:text-white text-lg">
                    Signup
                  </Link>
                </li>
              </ul>
            </nav>
          )
          }

          {authToken && userRole !== 'admin' && (
            <nav className="mt-2 pl-4 text-center font-semibold">
              <ul>
                <li>
                  <Link to="/profile" className="block p-2  hover:bg-[#D09FCE] hover:text-white text-lg">Profile</Link>
                </li>

                <li>
                  <Link to="/order" className="block pr-2 pb-2 pt-2 pl-2 hover:bg-[#D09FCE] hover:text-white text-lg">Orders</Link>
                </li>

                <li>
                  <Link to="/product" className="block p-2 pl-4 hover:bg-[#D09FCE] hover:text-white text-lg">Product</Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setCartlength(0);
                      logout();
                    }}
                    className="block p-2 pl-3 w-full hover:bg-[#D09FCE] hover:text-white text-lg"
                  >
                    Logout
                  </button>
                </li>

              </ul>
            </nav>
          )
          }

          {authToken && userRole === 'admin' && (


            <nav className="mt-2 pl-2 text-center text-lg font-semibold">
              <ul>
                <li>  <Link to="/profile" className="block p-2  hover:bg-[#D09FCE] hover:text-white  ">
                  Profile
                </Link>
                </li>
                <li>

                </li>

                <li>
                  <Link to="/order" className="block pr-2 pb-2 pt-2 pl-1  hover:bg-[#D09FCE] hover:text-white ">Order</Link>
                </li>

                <li>
                  <Link to="/adminproduct" className="block p-2 pl-6  hover:bg-[#D09FCE] hover:text-white ">Product</Link>
                </li>
                <li>
                  <Link to="/user" className="block pt-2 pr-2 pb-2 hover:bg-[#D09FCE] hover:text-white ">User</Link>
                </li>
                <li>
                  <Link to="/category" className="block p-2 pl-8 hover:bg-[#D09FCE] hover:text-white "> Category</Link>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setCartlength(0);
                      logout();
                    }}
                    className="block p-2 w-full pl-4  hover:bg-[#D09FCE] hover:text-white text-lg"
                  >
                    Logout
                  </button>
                </li>

              </ul>
            </nav>
          )
          }
       </aside>
     </header>
    </div>

  )
}
