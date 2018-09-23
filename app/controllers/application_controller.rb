class ApplicationController < ActionController::Base
    # null session for the API-style controllers because we have no use for the session object.
    protect_from_forgery with: :null_session
end
