/* Error ka instsnce banaye api-error handle krne ke liye taki aur bhi add karna chahu toh kar saku 
        aur jahan use karege vahan instance banake easily use kar sakte hai  */

        class apiError extends Error {
            constructor(statusCode, message, errors = [], stack) {
              super(message);
              Object.defineProperty(this, "message", {
                value: message,
                enumerable: true,
              });
              (this.statusCode = statusCode), (this.message = message);
              this.error = errors; //parameter me empty array set kiya hai jo array aayegi vo yahan value set ho jayegi
              this.success = false;
          
              if (stack) {
                this.stack = stack;
              } else {
                /* yahan pehlee this us instance object ko refer kar rha hai taki usko captureStackTrace mil jaye 
                       dusra this.construtor child inheritence ko refer kr rha hai taki usko mil jaye y eh  */
                Error.captureStackTrace(this, this.constructor);
              }
            }
          }
          
          export { apiError };
          