import Time "mo:core/Time";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";

actor {
  // Types
  type Status = {
    #normal;
    #suspicious;
    #criminal;
  };

  type SuspiciousReport = {
    id : Nat;
    reporterId : Text;
    targetMobile : Text;
    description : Text;
    timestamp : Int;
  };

  type SearchLog = {
    id : Nat;
    searcherId : Text;
    searchType : Text;
    searchQuery : Text;
    timestamp : Int;
  };

  type UserProfile = {
    id : Nat;
    name : Text;
    mobile : Text;
    address : Text;
    photo : Storage.ExternalBlob;
    status : Status;
    accessCode : Text;
    createdAt : Int;
  };

  type Stats = {
    totalUsers : Nat;
    totalCriminals : Nat;
    totalReports : Nat;
  };

  type CallerProfile = {
    name : Text;
  };

  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Storage
  include MixinStorage();

  var nextUserId = 1;
  let users = Map.empty<Nat, UserProfile>();

  // Helper function to check admin access
  func verifyAdmin(caller : Principal) {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  // Helper function to check user access
  func verifyUser(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
  };

  // Required profile management functions
  let callerProfiles = Map.empty<Principal, CallerProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?CallerProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };
    callerProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : CallerProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    callerProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?CallerProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    callerProfiles.get(user);
  };

  // Admin functions
  public shared ({ caller }) func addUser(
    name : Text,
    mobile : Text,
    address : Text,
    photo : Storage.ExternalBlob,
    status : Status,
    accessCode : Text,
  ) : async Nat {
    verifyAdmin(caller);

    let id = nextUserId;
    nextUserId += 1;
    let user : UserProfile = {
      id;
      name;
      mobile;
      address;
      photo;
      status;
      accessCode;
      createdAt = Time.now();
    };

    users.add(id, user);
    id;
  };
};
