✅ Pages where SEO metadata is important:
These are routed pages users may land on directly via search engines or social shares:
✅  = Done
🏠 General Pages
Home.jsx✅ 

Contact.jsx✅ 

OurFarm.jsx✅ 

Accessibility.jsx✅ 

🧀 Products
ProductList.jsx✅ 

ProductDetails.jsx ✅ (important to add meta based on the product’s name, category, and description)

Checkout.jsx ✅(less important, but still good for branding keywords)

Confirmation.jsx ✅

✍️ Blog
BlogPage.jsx

BlogPost.jsx (important — dynamic metadata based on post title/content/author)

🐐 Goats
OurGoats.jsx (if this exists, not explicitly listed — if GoatList.jsx is the main page, wrap it)

Individual goat detail pages (if you later implement them — useful for goat name, awards, sale status, ADGA registration, etc.)

💬 Forum
ForumPage.jsx

ForumPost.jsx (use dynamic meta for title, author, and tags)

👤 Auth
Login.jsx, Register.jsx, ForgotPassword.jsx — SEO not critical, but can include minimal branding metadata

🚫 Components that do not need SEO metadata:
These are not directly routed or user-facing entry points, and shouldn’t contain SEO metadata like <Title> or <Meta>.

GoatCard.jsx

ProductCard.jsx

BlogCard.jsx

MenuBar.jsx, Spinner.jsx, Logo.jsx, etc.

{pickupName && pickupLocation && pickupTime && (
  <SeoHead
    title={`Order Confirmed for ${pickupName} | Blueberry Dairy`}
    description={`Thank you, ${pickupName}, for your order from Blueberry Dairy. Pickup is scheduled for ${pickupTime} at ${pickupLocation}.`}
    image='https://res.cloudinary.com/dzhweqopn/image/upload/v1748887807/goat_logo_3_s898tm.png'
    url='https://www.blueberrydairy.com/confirmation'
  />
)}
