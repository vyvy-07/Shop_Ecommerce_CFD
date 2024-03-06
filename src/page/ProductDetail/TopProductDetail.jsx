import { formatCurrency } from "../../utils/format";
import QuantityInput from "../../components/QuantityInput";
import { useEffect } from "react";

const TopProductDetail = ({
  dataReview,
  price,
  name,
  rating,
  quantity,
  images,
  id,
}) => {
  const handleOnChange = (value) => {
    // console.log("value", value);
  };
  useEffect(() => {
    function zoom() {
      // Product Image Zoom plugin - product pages
      if ($.fn.elevateZoom) {
        $("#product-zoom").elevateZoom({
          gallery: "product-zoom-gallery",
          galleryActiveClass: "active",
          zoomType: "inner",
          cursor: "crosshair",
          zoomWindowFadeIn: 400,
          zoomWindowFadeOut: 400,
          responsive: true,
        });

        // On click change thumbs active item
        $(".product-gallery-item").on("click", function (e) {
          $("#product-zoom-gallery").find("a").removeClass("active");
          $(this).addClass("active");

          e.preventDefault();
        });

        var ez = $("#product-zoom").data("elevateZoom");

        // Open popup - product images
        $("#btn-product-gallery").on("click", function (e) {
          if ($.fn.magnificPopup) {
            $.magnificPopup.open(
              {
                items: ez.getGalleryList(),
                type: "image",
                gallery: {
                  enabled: true,
                },
                fixedContentPos: false,
                removalDelay: 600,
                closeBtnInside: false,
              },
              0
            );

            e.preventDefault();
          }
        });
      }

      // Product Gallery - product-gallery.html
      if ($.fn.owlCarousel && $.fn.elevateZoom) {
        var owlProductGallery = $(".product-gallery-carousel");

        owlProductGallery.on("initialized.owl.carousel", function () {
          owlProductGallery.find(".active img").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 400,
            zoomWindowFadeOut: 400,
            responsive: true,
          });
        });

        owlProductGallery.owlCarousel({
          loop: false,
          margin: 0,
          responsiveClass: true,
          nav: true,
          navText: [
            '<i class="icon-angle-left">',
            '<i class="icon-angle-right">',
          ],
          dots: false,
          smartSpeed: 400,
          autoplay: false,
          autoplayTimeout: 15000,
          responsive: {
            0: {
              items: 1,
            },
            560: {
              items: 2,
            },
            992: {
              items: 3,
            },
            1200: {
              items: 3,
            },
          },
        });

        owlProductGallery.on("change.owl.carousel", function () {
          $(".zoomContainer").remove();
        });

        owlProductGallery.on("translated.owl.carousel", function () {
          owlProductGallery.find(".active img").elevateZoom({
            zoomType: "inner",
            cursor: "crosshair",
            zoomWindowFadeIn: 400,
            zoomWindowFadeOut: 400,
            responsive: true,
          });
        });
      }

      // Product Gallery Separeted- product-sticky.html
      if ($.fn.elevateZoom) {
        $(".product-separated-item").find("img").elevateZoom({
          zoomType: "inner",
          cursor: "crosshair",
          zoomWindowFadeIn: 400,
          zoomWindowFadeOut: 400,
          responsive: true,
        });

        // Create Array for gallery popup
        var galleryArr = [];
        $(".product-gallery-separated")
          .find("img")
          .each(function () {
            var $this = $(this),
              imgSrc = $this.attr("src"),
              imgTitle = $this.attr("alt"),
              obj = { src: imgSrc, title: imgTitle };

            galleryArr.push(obj);
          });

        $("#btn-separated-gallery").on("click", function (e) {
          if ($.fn.magnificPopup) {
            $.magnificPopup.open(
              {
                items: galleryArr,
                type: "image",
                gallery: {
                  enabled: true,
                },
                fixedContentPos: false,
                removalDelay: 600,
                closeBtnInside: false,
              },
              0
            );

            e.preventDefault();
          }
        });
      }
    }
    if (id) {
      zoom();
    }
  }, [id]);

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <div className="product-gallery product-gallery-vertical">
            <div className="row">
              {!images ? (
                <figure className="product-main-image">
                  <img
                    id="product-zoom"
                    src="/assets/images/products/single/1.jpg"
                    data-zoom-image="/assets/images/products/single/1-big.jpg"
                    alt="product image"
                  />
                  <div id="btn-product-gallery" className="btn-product-gallery">
                    <i className="icon-arrows" />
                  </div>
                </figure>
              ) : (
                <figure className="product-main-image">
                  <img
                    id="product-zoom"
                    src={images[0]}
                    data-zoom-image={images[0]}
                    alt="product image"
                  />
                  <div id="btn-product-gallery" className="btn-product-gallery">
                    <i className="icon-arrows" />
                  </div>
                </figure>
              )}
              <div id="product-zoom-gallery" className="product-image-gallery">
                <a
                  className="product-gallery-item active"
                  href="#"
                  data-image="/assets/images/products/single/1.jpg"
                  data-zoom-image="/assets/images/products/single/1-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/1-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/2-big.jpg"
                  data-zoom-image="/assets/images/products/single/2-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/2-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/3-big.jpg"
                  data-zoom-image="/assets/images/products/single/3-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/3-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
                <a
                  className="product-gallery-item"
                  href="#"
                  data-image="/assets/images/products/single/4-big.jpg"
                  data-zoom-image="/assets/images/products/single/4-big.jpg"
                >
                  <img
                    src="/assets/images/products/single/4-small.jpg"
                    alt="Dark yellow lace"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{ width: `${(rating || 0) * 20}%` }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {dataReview?.length} Reviews )
              </a>
            </div>
            <div className="product-price">{`$${formatCurrency(price)}`} </div>
            <div className="product-content">
              <p>
                Sed egestas, ante et vulputate volutpat, eros pede semper est,
                vitae luctus metus libero eu augue. Morbi purus libero, faucibus
                adipiscing. Sed lectus.{" "}
              </p>
            </div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <div className="product-nav product-nav-dots">
                <div
                  className="product-nav-item active"
                  style={{ background: "#e2e2e2" }}
                >
                  <span className="sr-only">Color name</span>
                </div>
                <div
                  className="product-nav-item"
                  style={{ background: "#333333" }}
                >
                  <span className="sr-only">Color name</span>
                </div>
                <div
                  className="product-nav-item"
                  style={{ background: "#f2bc9e" }}
                >
                  <span className="sr-only">Color name</span>
                </div>
              </div>
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <QuantityInput
                className="cart-product-quantity"
                onChange={(value) => handleOnChange(value)}
              />
            </div>
            <div className="product-details-action">
              <a href="#" className="btn-product btn-cart">
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <a href="#">Women</a>, <a href="#">Dresses</a>,{" "}
                <a href="#">Yellow</a>
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <a
                  href="#"
                  className="social-icon"
                  title="Facebook"
                  target="_blank"
                >
                  <i className="icon-facebook-f" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Twitter"
                  target="_blank"
                >
                  <i className="icon-twitter" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Instagram"
                  target="_blank"
                >
                  <i className="icon-instagram" />
                </a>
                <a
                  href="#"
                  className="social-icon"
                  title="Pinterest"
                  target="_blank"
                >
                  <i className="icon-pinterest" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopProductDetail;
