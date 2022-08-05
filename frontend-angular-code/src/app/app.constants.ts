import { environment } from "environments/environment";

export default class AppConstants {
    public static readonly GOOGLE_APP_KEY = ''; // add google map api key
    public static readonly USER_EDITED_SUCCESS: string = 'User edit successfully!';
    public static readonly USER_ADDED_SUCCESS: string = 'User added successfully!';
    public static readonly USER_DELETE_SUCCESS: string = 'User deleted successfully!';
    public static readonly COMMON_ERROR: string = 'Something went wrong';
    public static readonly ERROR: string = 'Error';
    public static readonly SUCCESS: string = 'Success';
    public static readonly ADD_USER: string = 'Add User';
    public static readonly EDIT_USER: string = 'Edit User';
    public static readonly COMMON_URL: string = `${environment.apiHost}api/`;
    public static readonly USER: string = `${this.COMMON_URL}user`;
    public static readonly USER_FAV_LOCATION: string = `${this.COMMON_URL}user-fav-location`;
    public static readonly DELETE_USER_ALERT = 'Are you sure, you want to delete this user?';
    public static readonly DELETE_ALERT = 'Delete';
    public static readonly USER_ROLES: Array<{ name: string, value: string }> = [
        {
            name: 'Developer',
            value: 'developer'
        },
        {
            name: 'Center Admin',
            value: 'centreAdmin'
        },
        {
            name: 'System Admin',
            value: 'systemAdmin'
        }
    ];
}