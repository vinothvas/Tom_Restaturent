const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} MyRestaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;